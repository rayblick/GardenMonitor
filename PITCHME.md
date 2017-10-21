# My Garden Monitor

---


## The Garden
+++
## Floor plan
+++
## Seed propagator


---


## References and Documentation

* [Github Documentation](https://github.com/rayblick/GardenMonitor)
* [Building Wireless Sensor Networks Using Arduino (Community Experience Distilled)](https://www.amazon.com.au/d/Building-Wireless-Community-Experience-Distilled-ebook/B012O8S296/ref=sr_1_1?ie=UTF8&qid=1507496006&sr=8-1&keywords=building+wireless+network)
* [Arduino docs](https://www.arduino.cc/)
* [Arduino Cheatsheet](http://makitpro.com/index.php/2016/04/14/arduino-cheat-sheet/)
* [Arduino Wireless Shield documentation](https://www.arduino.cc/en/Guide/ArduinoWirelessShield)


---


## Hardware

* [Raspberry Pi](https://www.raspberrypi.org)
* [Arduino Uno](https://store.arduino.cc/usa/arduino-uno-rev3)
* [XBee Explorer USB](https://www.sparkfun.com/products/11812)
* [XBee Modules](https://core-electronics.com.au/xbee-module-zb-series-2-2mw-with-wire-antenna-xb24-z7wit-004.html)
* [Solar kit](https://core-electronics.com.au/wireless-sensor-node-solar-kit-seeed-studio.html)
* [Arduino XBee shield](https://www.pakronics.com.au/products/xbee-shield-v2-0-ss103030004)
* [Dragino](https://core-electronics.com.au/dragino-v2-iot-sensor-node-seeed-studio.html)
* [Grove Temp & Humidity sensors](https://www.pakronics.com.au/products/grove-temp-humi-barometer-sensor-bme280-ss101020193)
* Waterproof enclosure


---


## Software

* [Arduino IDE](https://www.arduino.cc/en/Main/Software)
* [Digi XBee software XTCU](https://www.digi.com/products/xbee-rf-solutions/xctu-software/xctu)
* [Postgresql](https://www.postgresql.org/)


---


## Raspberry Pi Configuration

* Raspberry Pi(ARMv7 Processor rev 4 (v7l))
* Debian Jessie OS
* Python 3.4


+++ 

## Raspberry Pi OS install

+++ 

## RPi Wifi Connection 


---


## Database 
#### (Scroll down) 

+++ 

## Installation and Initial Config

```bash
# install postgres
pi@home~$ sudo apt-get install postgresql-9.4

# open postgres
pi@home~$ sudo -u postgres psql postgres

# change password for user "postgres"
postgres=# \password postgres
postgres=# ******

# quit
postgres=# \q

# modify the following file to allow local connections
pi@home~$ nano /etc/postgresql/9.4/main/pg_hba.conf

# restart postgres
sudo service postgresql restart 
```

+++

## Create Database 

```bash
# list all dbs
postgres=# \l+

# create database
postgres=# CREATE DATABASE homesensors;

# switch to database
postgres=# \c homesensors
homesensors=# \c postgres
```

+++ 

## Add User and Privileges

```bash
# create user
postgres=# CREATE USER ray WITH PASSWORD 'password' CREATEDB CREATEUSER;

# list users
postgres=# \dg+

# Upgrade user to add roles
postgres=# ALTER USER ray WITH CREATEROLE;

# Add user 'ray' to database 'homesensors'
postgres=# GRANT ALL PRIVILEGES ON homesensors To ray;

# sign in with new user
postgres=# \q
pi@home~$ psql homesensors ray
pi@home~$ Password for user ray: password
```

+++ 

## Data example

```python
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
homesensors=# \dt

# drop table (if required)
DROP TABLE sensor_data; 
 

---


## Flask API

+++

## Install 

+++

## Virtualenv

+++

## app.py

+++ 

## Example flask 


+++ 

## Example post data


---


## Connect Flask with Postgres

+++

## Install dependencies

+++

## Import and Connect to DB

+++

## GET data

+++

## POST data


---

## Check database using an app (RemoDB)


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
