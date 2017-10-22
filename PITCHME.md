# My Garden Monitor

---


## The Garden
+++
## Floor plan
+++
## Seed propagator


---


## References

* [Github Documentation](https://github.com/rayblick/GardenMonitor)
* [Building Wireless Sensor Networks Using Arduino (Community Experience Distilled)](https://www.amazon.com.au/d/Building-Wireless-Community-Experience-Distilled-ebook/B012O8S296/ref=sr_1_1?ie=UTF8&qid=1507496006&sr=8-1&keywords=building+wireless+network)
* [Arduino docs](https://www.arduino.cc/)
* [Arduino Cheatsheet](http://makitpro.com/index.php/2016/04/14/arduino-cheat-sheet/)
* [Arduino Wireless Shield documentation](https://www.arduino.cc/en/Guide/ArduinoWirelessShield)


---

## Components


+++


## Hardware

* [Raspberry Pi](https://www.raspberrypi.org)
* [Arduino Uno](https://store.arduino.cc/usa/arduino-uno-rev3)
* [XBee Explorer USB](https://www.sparkfun.com/products/11812)
* [XBee Modules](https://core-electronics.com.au/xbee-module-zb-series-2-2mw-with-wire-antenna-xb24-z7wit-004.html)
* [Solar kit](https://core-electronics.com.au/wireless-sensor-node-solar-kit-seeed-studio.html)
* [Arduino XBee shield](https://www.pakronics.com.au/products/xbee-shield-v2-0-ss103030004)
* [Grove Temp & Humidity sensors](https://www.pakronics.com.au/products/grove-temp-humi-barometer-sensor-bme280-ss101020193)
* Waterproof enclosure


+++


## Software

* [Arduino IDE](https://www.arduino.cc/en/Main/Software)
* [Digi XBee software XTCU](https://www.digi.com/products/xbee-rf-solutions/xctu-software/xctu)
* [Postgresql](https://www.postgresql.org/)


---


## Database 

+++ 

## Setup

```shell
# install and open Postgresql
pi@home~$ sudo apt-get install postgresql-9.4
pi@home~$ sudo -u postgres psql postgres
```

```psql
-- change password for user "postgres"
postgres=# \password postgres

-- quit
postgres=# \q
```

```bash
# modify the following file to allow local connections
pi@home~$ nano /etc/postgresql/9.4/main/pg_hba.conf
pi@home~$ sudo service postgresql restart 
```

+++

## Create Database 

```psql
-- create database
postgres=# CREATE DATABASE homesensors;

-- list all dbs
postgres=# \l+

-- switch to database
postgres=# \c homesensors
homesensors=# \c postgres
```

+++ 

## Add User and Privileges

```psql
-- create user
postgres=# CREATE USER ray WITH PASSWORD 'password' CREATEDB CREATEUSER;

-- list users
postgres=# \dg+

-- upgrade user to add roles
postgres=# ALTER USER ray WITH CREATEROLE;

-- add user 'ray' to database 'homesensors'
postgres=# GRANT ALL PRIVILEGES ON homesensors To ray;
 
-- quit
postgres=# \q
```

```shell
pi@home~$ psql homesensors ray
pi@home~$ Password for user ray: password
```

+++ 

## Data example

```json
{
  "name": "Seed propagator",
  "location": "Garden",
  "category": "Climate",
  "measurementType": "temp",
  "value": 24,
  "dsCollected": 20171018T1000,
  "dsAdded": (auto)
}
```

+++

## Other operations

```bash
# Sign in and show tables (if exist)
pi@home~$ psql homesensors ray
```

```psql
homesensors=# \dt

-- drop table (if required)
homesensors=# DROP TABLE sensor_data; 
``` 

---


## Flask API

+++

## Setup 

```bash
# install virtualenv
sudo apt-get install virtualenv


# create project directory 
mkdir repos/homesensors
```

+++

## Virtualenv

```shell
# base install
sudo apt-get install virtualenv python-psycopg2 libpq-dev


# location: repos/homesensors - create virtual environment
virtualenv -p python3 flask


# activate and install python packages
cd flask/bin && source activate
pip install flask flask_sqlalchemy psycopg2
```

+++

## Create app.py

```shell
# create file
nano app.py


# make executable
chmod a+x app.py
```

+++ 


## Flask app (app.py)

```
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
	dsCollected = db.Column(db.String(13))

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

```


+++ 


## GET data

```shell
curl -i  
http://localhost:5000/homesensors/api/v1.0/sensor_data
```

+++


## POST data

```shell
curl -i -H "Content-Type: application/json" -X 
post -d '{"name": "dummyA", "location":"garden", 
"category":"dummyA", "measurementType":"temp", 
"value": 1500, "dsCollected": "20171018T1000"}' 
http://localhost:5000/homesensors/api/v1.0/sensor_data
```

---


## XBee Modules

+++

## XBee setup

+++

## Test run sending messages


---


## Solar kit

+++

## Grove Temp and Humidity sensor

+++

## Setup 

+++

---

## Sending data
