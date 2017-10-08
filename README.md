# My Garden Monitor

I like gardening and I like data... this project is is going to record data in my garden.

### What I want...
What I want to acheive is a modular and extensible framework to monitor my garden. I want to be able to continuously add new sensors into my garden that will transmit data to a cloud service and provide real time information. All sensors must be solar powered.

### Initial project scope and direction
One coordinator (head) node will consume data from router (slave) nodes positioned in my garden. The slaves will be solar powered arduino compatible boards that collect and transmit data captured from Grove sensors (e.g. Temp and Humidity). Each slave can have two sensors that will vary depending on location and application. Importantly slaves are configured in a mesh network so that other slaves can pass on data to the head node if distance/comms is a problem. Once the data has reached the head node it gets passed to a "Dragino" which will be the connection to the internet and subsequently a cloud service that will host my data. The data will be accessible with an API to provide data visualisation.  

### Product list
* Arduino Uno
* Explorer XBee USB
* 2x XBees
* Arduino XBee shield
* Dragino
* Grove Temp & Humidity sensors
* Waterproof enclosure

### More information
https://gitpitch.com/rayblick/GardenMonitor/master
