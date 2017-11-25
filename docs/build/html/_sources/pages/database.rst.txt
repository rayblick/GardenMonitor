Postgres Database
==================

Aim
----
Setup data storage location.  


Summary
--------

Setup a postgres database running on your local network. Add a user and allow the new user to have full privileges.

Install and open
-------------------

.. code-block:: bash

        # search for postgres
        sudo apt-cache search postgres

        # install
	sudo apt-get install postgresql-9.6

        # open
	sudo -u postgres psql postgres


Change password for user called "postgres"
---------------------------------------------

.. code-block:: psql
	
	\password postgres
	\q


Allow local connections
------------------------


.. code-block:: bash

        # step 1
	nano /etc/postgresql/9.4/main/pg_hba.conf

        # update the following section...

        # Database administrative login by Unix domain socket
        local   all             postgres                                peer
        # TYPE  DATABASE        USER            ADDRESS                 METHOD
        # "local" is for Unix domain socket connections only
        local   all             all                                     md5
        
        # IPv4 local connections:
        host    all             all             127.0.0.1/32            md5
        # IPv6 local connections:
        host    all             all             ::1/128                 md5
        # Allow replication connections from localhost, by a user with the
        # replication privilege.
        #local   replication     postgres                                peer
        #host    replication     postgres        127.0.0.1/32            md5
        #host    replication     postgres        ::1/128                 md5
        
        host    all             all             0.0.0.0/0               md5
        host    all             all             ::/0                    md5

	# exit => ctrl-x > y > enter
        
        # step 2
        nano /etc/postgresql/9.4/main/postgresql.conf

        # locate the following line...
        # listen_addresses = "127.0.0.1" 
        
        # Change to this...
        listen_addresses = "*" #WARNING: Make sure you uncomment this line by removing the # symbol

        # exit => ctrl-x > y > enter



Create database
----------------

Start database using user "postgres" (first code block above) 

.. code-block:: psql

	-- list databases
        \l+

	-- create db
	CREATE DATABASE homesensors


	-- connect
	\c homesensors


.. WARNING:: A database called homesensors is required in the next step. The model we create in the Flask API will be called HomeSensorsData and it will live in the homesensors database.



Create user
-----------

.. code-block:: psql

	-- create
	CREATE USER ray WITH PASSWORD 'password' 

	-- list users
	\dg+

	-- add roles
	ALTER USER ray WITH CREATEROLE
        ALTER USER ray WITH createdb;
        ALTER USER ray WITH Superuser;

	-- add privileges
	GRANT ALL PRIVILEGES ON homesensors To ray


.. WARNING:: The Flask API requires that the user name "ray" is available to access the database in following steps. If you change this name, and you most likely will, make the appropriate changes to the Flask API. The location for making changes will be highlighted in the next step. 


Restart postgres
-----------------

.. code-block:: bash

	sudo service postgresql restart



Signing in
-----------

.. code-block:: bash

	# sign in with new user
	psql homesensors ray
	
	#Password for user ray: 
	password


Testing
---------
Install SQL client and connect.

.. image:: ../img/remodb_mobile1.png
   :width: 300
   :align: center

.. image:: ../img/remodb_mobile2.png
   :width: 300
   :align: center

.. image:: ../img/remodb_mobile3.png
   :width: 300
   :align: center
