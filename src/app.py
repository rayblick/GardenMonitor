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


def predictions(name, location, measurementType):
     predictions = []


@app.route('/homesensors/api/v1.0/sensor_data', methods=['POST'])
def add_sensor_data():
    """
    Adds data to postgres database.

    Two core functions
    -------------------- 
    1) add the new data
    2) update prediction model

    Prediction model 
    -----------------
    Hybrid model:
        Create dataframe so that every record looks back n hours. 
        Create a target column by shifting the data forward,
        so that the predictions are n hours into the future 
    """
    if not request.json or not 'value' in request.json:
        abort(400)

    #handle data obj
    sendat = HomeSensorData(
        name = request.json['name'],
        location = request.json['location'],
        category = request.json['category'], # actual or prediction
        measurementType = request.json['measurementType'],
        value = request.json['value'],
        dsCollected = request.json['dsCollected']
    )
    # add new record
    db.session.add(sendat)
    
    # conditional checks for prediction updates
    # 24 hours must have elapsed since last prediction
    # Atleast 7 days of data (24*7=168 records) 

    # truncate old predictions
    #HomeSensorData.query.filter(HomeSensorData.category=="pred",
    #   HomeSensorData.name==request.json['name']).delete()

    # get "actual" data
    actuals = HomeSensorData.query.filter(HomeSensorData.category=="actual",
       HomeSensorData.name==request.json['name'])

    # create pandas dataframe

    # create rolling mean (4 hour window)

    # create regular intervals (1 hour)

    # create new columns and "shift" n hours (48 records for one day=48 cols) 

    # create a target column (shift(-24) hours)

    # random forest prediction

    # merge datestamp with predictions (now to 24 hours)

    # create list of dictionaries with sensor data

    # add all new predictions

    # commit all changes include deletion and recreation of predictions
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
    data = json.dumps({"data": mylist})
    #print(data)
    return data, 201



if __name__ == '__main__':
    app.run(debug=True)


