# My Garden Monitor

I like gardening and I like data... this project is is going to record data in my garden.

### What I want...
What I want is a modular and extensible framework to monitor plants in my garden. I want to be able to continuously add new sensors that will transmit data to a cloud service and provide real time information. All sensors must be solar powered.

### Initial project scope and direction
One coordinator (head) node will consume data from router (slave) nodes positioned in my garden. The slaves will be solar powered arduino compatible boards that collect and transmit data captured from Grove sensors (e.g. Temp and Humidity). Each slave can have two sensors that will vary depending on location and application. Importantly slaves are configured in a mesh network so that other slaves can pass on data to the head node if distance/comms is a problem. Once the data has reached the head node a runshell command will be executed to send a data packet to a Flask API. All data will be transmitted and stored on the local network. Finally these data will be accessible using an API request to provide data for visualisation.  

### More information

**DOCS:** https://rayblick.github.io/GardenMonitor/ 
**PITCH:** https://gitpitch.com/rayblick/GardenMonitor/master
