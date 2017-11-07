API
====

Aim
----
Setup data transmission. 


Summary
--------

By the end of this page you should have a method of adding and receiving data from the postgres db.

Base install 
--------------

.. code-block:: bash

	sudo apt-get install virtualenv
	sudo apt-get install python-psycopg2
	sudo apt-get install libpq-dev


Folder structure
-----------------

I have decided to build this section in its own repo. The following steps setup the virtual environment.

.. code-block:: bash

	# folders
	cd repos
	mkdir homesensors
	cd homesensors

	# virtualenv
	virtualenv -p python3 flask
	cd flask/bin && source activate
	
	# check python 3 is default
	python


Pip install 
------------

.. code-block:: bash
	
	# venv activated
	pip install flask
	pip install flask_sqlalchemy
	pip install psycopg2
	

app.py
-------

.. code-block:: bash

	# create app.py
        nano app.py
	# Exit >> ctrl x 
	
	# make app.py executable
	chmod a+x app.py
	


Example app
------------

.. code-block:: python

	#!python
	from flask import Flask

	app = Flask(__name__)

	@app.route('/')
	def index():
		return "Hello world"

	if __name__ == '__main__':
		app.run(debug=True)


Run app.py
-----------

.. code-block:: bash

	./app.py
	
	# Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
	# Restarting with stat
	# Debugger is active! 
	# Debugger PIN: 144-156-571



API code listing
-----------------

.. code-block:: python

	#!python
	from flask import Flask, jsonify, request, abort
	from flask_sqlalchemy import SQLAlchemy
	import json

	app = Flask(__name__)

	POSTGRES = {
		'user': 'ray',
		'pw': 'password',
		'db': 'homesensors',
		'host': 'localhost',
		'port': '5432'
	}

	app.config['SQLALCHEMY_DATABASE_URI']='postgresql://%(user)s:%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

	db = SQLAlchemy(app)

	class HomeSensorData(db.Model):
		id = db.Column(db.Integer, primary_key=True)
		name = db.Column(db.String(50))
		location = db.Column(db.String(50))
		category = db.Column(db.String(50))
		measurementType = db.Column(db.String(50))
		value = db.Column(db.Integer)
		dsCollected = db.Column(db.String(30))

	db.create_all()

	@app.route('/homesensors/api/v1.0/sensor_data', methods=['POST'])
	def add_sensor_data():
		if not request.json or not 'value' in request.json:
			abort(400)

		#handle data obj
		sendat = HomeSensorData(
			name = request.json['name'],
			location = request.json['location'],
			category = request.json['category'],
			measurementType = request.json['measurementType'],
			value = request.json['value'],
			dsCollected = request.json['dsCollected']
		)
		db.session.add(sendat)
		db.session.commit()
                return "Record added successfully\n"

	@app.route('/homesensors/api/v1.0/sensor_data', methods=['GET'])
	def get_sensor_data():
		sendat = HomeSensorData.query.all()
		mylist = []
		for u in sendat:
			mydict = {}
			for key, value in u.__dict__.items():
				if key != "_sa_instance_state":
					mydict[key] = value
			mylist.append(mydict)
		data = json.dumps(mylist)
		return data, 201


	if __name__ == '__main__':
		app.run(debug=True)


GET request
------------

.. code-block:: bash

	curl -i  http://localhost:5000/homesensors/api/v1.0/sensor_data


POST request
------------

.. code-block:: bash


	curl -i -H "Content-Type: application/json" 
		-X post -d '{"name": "dummyA", 
			"location": "garden", 
			"category": "dummyA", 
			"measurementType": "temp", 
			"value": 1500, 
			"dsCollected": "20171018T1000"}' 
		http://localhost:5000/homesensors/api/v1.0/sensor_data
