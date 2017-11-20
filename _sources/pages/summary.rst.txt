Garden Monitor
==============


:Authors:
    Ray Blick
:Version: 0.1
:Last update: 2017/11/08


Overview
----------
A Raspberry Pi hosts 1) a postgres database, 2) a flask API and 3) a basic react web application. The measurements are taken using grove sensors attached to Arduino compatible carrier boards. These data are sent to the postgres database using an API POST request. The flask API is responsible for commiting data to the database. The react web application uses an API GET request to access these data and generate a D3 timeseries chart. Several buttons allow the user to filter these data.  



Aim
----

Record temperature from multiple locations in my garden/home and display these data in a dashboard. 


Background
------------
I have been thinking about garden monitors for a while now. The original project was called "Tweepy Pond" which started in Brisbane 2013. This was a motion activated raspberry pi enabled camera mixed with a temperature monitor to observe creatures in a home-made pond. Tweepy Pond was my first Raspberry Pi project and one of my first Python projects.

When I moved to Sydney this project turned into a balcony temperature monitor for the occasional pot plant. Now, still in Sydney and a new place to call home I have become interested in propagating vegetables. Subsequently I have reimagined tweepy pond to incorporate a variety of sensors that could communicate on the local area network.  


Development timeline
----------------------
- 2017 = Garden Monitor
- 2015 = Pot plant temperature gauge
- 2013 = Tweepy pond (Raspberry Pi pond monitor) 


Scope
------
- Everything on the local network
- Raspberry Pi
- Raspbian OS
- Arduino Uno
- XBee modules
- Grove sensors
- Zigbee mesh network
- Python 3
- Flask (API)
- React
- D3


Out of scope
-------------
- The cloud.


Follow along
--------------
You can skip the pages titled setup and docs. This project was developed using a raspberry pi, Raspbian stretch and python 3.4.

.. warning:: You will need to make changes to the Flask API if you are using python 2.x. I haven't tried so the errors that might come up are not covered in this documentation. 

 
.. image:: ../img/visitor.JPG
   :width: 600  
   :align: center  
