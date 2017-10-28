Database
========


Summary
--------

Setup data storage location. By the end of this page you should have a postgres database running on your local network.

Install and open
-------------------

.. code-block:: bash

	sudo apt-get install postgresql-9.4
	sudo -u postgres psql postgres


Change password for user called "postgres"

.. code-block:: psql
	
	\password postgres
	\q

Modify pg_hba.conf to allow local connections

.. code-block:: bash

	nano /etc/postgresql/9.4/main/pg_hba.conf

Restart postgres

.. code-block:: bash

	sudo service postgresql restart


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


Create user
-----------

.. code-block:: psql

	-- create
	CREATE USER ray WITH PASSWORD 'password' CREATEDB CREATEUSER

	-- list users
	\dg+

	-- add roles
	ALTER USER ray WITH CREATEROLE

	-- add privileges
	GRANT ALL PRIVILEGES ON homesensors To ray


Signing in
-----------

.. code-block:: bash

	# sign in with new user
	psql homesensors ray
	
	#Password for user ray: 
	password
