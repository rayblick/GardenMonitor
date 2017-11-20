React App: Building blocks
===========================

Aim
----
Create react app. 


Summary
--------
By the end of this page you should have a bare bones react app ready for modification.


Uninstall node
---------------

.. note:: This step was required with an old OS I was using. I have included it here for my reference because I botched an install of node and npm that required sudo permissions. The fresh install did not come with node. Also note that update and upgrade is only required if you haven't started from the beginning of these docs.

.. code-block:: bash

	# node
	sudo apt-get remove node

	# Drop node and npm from the following locations
	# 1. /usr/local/lib/
	# 2. /usr/local/include/
	# 3. /opt/nodejs/lib/
	# 4. /usr/local/bin

	# update and upgrade
	sudo apt-get update
	sudo apt-get upgrade
	sudo reboot


Install node and npm
-----------------------

.. code-block:: bash

	# Node Version Manager (nvm)
	git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout v0.33.5
	
	# edit files (add... source ~/.nvm/nvm.sh to the end of each file)
	sudo nano ~/.bashrc
	sudo nano ~/.profile 
	
	# Check NVM version
	nvm --version

	# check pi cpu etc
	lscpu

	# find appropriate version of node from nodejs.org/dist
	nvm install 8.0.0

	# Another step from botched install of node 
	nvm use --delete-prefix v8.0.0

	# update
	npm update -g npm


Install create-react-app 
-------------------------

.. code-block:: bash
	
	npm install -g create-react-app 


Build app and run
------------------

.. code-block:: bash
	
	# repos/homesensors
	create-react-app reactapp
	
	# Run
	cd reactapp
	npm start

