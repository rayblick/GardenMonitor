Setup
=====

Aim
----
Setup the project.


Summary
--------
This is mostly a reminder to myself, if you are following along you can skip this page. Just make sure python 3 is installed. 

.. image:: ../img/rpi.jpg
   :width: 600


Update and upgrade
-------------------

.. code-block:: bash

        sudo apt-get update
        sudo apt-get upgrade


Set timezone
---------------

.. code-block:: bash

        sudo dpkg-reconfigure tzdata


Install
---------

.. code-block:: bash
	
	sudo apt-get install python3


Folder
------

.. code-block:: bash
	
	# repos/
	mkdir GardenMonitor
	cd GardenMonitor


Git
----

.. code-block:: bash

	# repos/GardenMonitor
        git init

	# setup github repo, then...
	git remote add origin https://github.com/rayblick/GardenMonitor.git

