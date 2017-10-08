# My Garden Monitor

I like gardening and I like data... this project is is going to record data in my garden.

### What I want...
What I want is a modular and extensible framework to monitor plants in my garden. I want to be able to continuously add new sensors that will transmit data to a cloud service and provide real time information. All sensors must be solar powered.

### Initial project scope and direction
One coordinator (head) node will consume data from router (slave) nodes positioned in my garden. The slaves will be solar powered arduino compatible boards that collect and transmit data captured from Grove sensors (e.g. Temp and Humidity). Each slave can have two sensors that will vary depending on location and application. Importantly slaves are configured in a mesh network so that other slaves can pass on data to the head node if distance/comms is a problem. Once the data has reached the head node it gets passed to a "Dragino" which will be the connection to the internet and subsequently a cloud service that will host my data. The data will be accessible with an API to provide data visualisation.  

### Gear
* [Arduino Uno](https://store.arduino.cc/usa/arduino-uno-rev3) ([Arduino docs](https://www.arduino.cc/))
* [XBee Explorer USB](https://www.sparkfun.com/products/11812)
* 2 [XBee Modules](https://core-electronics.com.au/xbee-module-zb-series-2-2mw-with-wire-antenna-xb24-z7wit-004.html)
* [Solar kit](https://core-electronics.com.au/wireless-sensor-node-solar-kit-seeed-studio.html)
* [Arduino XBee shield](https://www.pakronics.com.au/products/xbee-shield-v2-0-ss103030004)
* [Dragino](https://core-electronics.com.au/dragino-v2-iot-sensor-node-seeed-studio.html)
* [Grove Temp & Humidity sensors](https://www.pakronics.com.au/products/grove-temp-humi-barometer-sensor-bme280-ss101020193)
* Waterproof enclosure

### More information
https://gitpitch.com/rayblick/GardenMonitor/master
