Garden Monitor
==============


:Authors:
    Ray Blick
:Version: 0.1
:Last update: 2017/10/25


Overview
----------

Arduino compatible boards with grove sensors (nodes) communicate on a zigbee mesh network. Each node measures data every 10 minutes and sends the packet of information to the head node (arduino uno). The head node makes a post request to the flask api which adds these data into a postgresql database which can be used to display data using react and d3.


Background
------------

This project was initially developed while trying to propagate seeds in a mini greenhouse (think 40cm plastic box with a few air vents). I primarily wanted to know when temperatures were high enough to sow seeds. Specifically, cucumber, beans and tomatoes. Time has marched on, I have moved, my seeds germinated and I have no idea what temperature did the trick... perhaps next year I will know.  


Aim
----

Record temperature and humidity data from multiple locations in my garden/home and display these data in a "fancy" dashboard. 

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
You can skip the pages titled setup and docs. This project was developed using a raspberry pi with Debian Jesse OS and python 3.4. 
