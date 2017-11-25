Sphinx documentation
=====================

Aim
----
Reminder for creating and editing documentation.


Summary
--------
Build documentation using Sphinx Documentation Generator. A little restructured text is shown as a reminder and the process of moving docs to gh-pages is detailed.


Install
--------

.. code-block:: bash
	
	sudo pip3 install sphinx
	sudo pip3 install sphinx_rtd_theme
	sphinx-build -h		


Core framework
-------------------

.. code-block:: bash

	# /repos/GardenMonitor
	mkdir docs
	cd docs

Build documentation

.. code-block:: bash

	# /repos/GardenMonitor/docs
	sphinx-quickstart
	# Follow the prompts
	# I choose all default options except to have build and source in separate folders


Update theme by editing conf.py (in /repos/GardenMonitor/docs/source/conf.py)

.. code-block:: python

        html_theme = "sphinx_rtd_theme"



Restructured Text
------------------

Update index.rst (/repos/GardenMonitor/docs/source)

.. code-block:: rst

	.. toctree::
		:maxdepth: 2
		:caption: Contents:

		/pages/summary
		/pages/setup
		/pages/docs
		/pages/database
		/pages/api
		/pages/xbee
		/pages/webserver


Add pages

.. code-block:: bash

	# /repos/GardenMonitor/docs/source
        mkdir pages
        touch  summary.rst setup.rst docs.rst database.rst api.rst xbee.rst webserver.rst

Add titles 

.. code-block:: bash
		
	Chapter 1 Title
	================


Add seealso box

.. code-block:: rst

	.. seealso:: seealso text

Add note box

.. code-block:: rst

	.. note:: note text


Add a warning box

.. code-block:: rst

	.. warning:: warning text


Add images 

.. code-block:: rst

	.. image:: img/rpi.jpg
		:width: 600
		:align: center
		:alt: alternate text

		This is a caption



Make documentation

.. code-block:: bash

	#/repos/GardenMonitor/docs
	make html


Git 
----

Add changes to github (assumes repo has been created)

.. code-block:: bash

	git add .
	git commit -m "added docs"
	git push origin master

If gh-pages already exists then remove it and start again (mainly because I stuffed it up the first time)

.. code-block:: bash

	# remove from remote
	git push origin --delete gh-pages

	# remove from local
	git branch -D gh-pages

gh-pages
---------

Host pages on github (you have to do this on every update to the docs)

.. code-block:: bash

	# First time
	git checkout -b gh-pages
	touch .nojekyll
	git checkout master docs/build/html
	mv ./docs/build/html/* ./
	rm -rf ./docs
	git add --all
	git commit -m "publishing docs"
	git push origin gh-pages


	# Updating
	git checkout gh-pages
	rm -rf *
	git checkout master docs/build/html
	mv ./docs/build/html/* ./
	rm -rf ./docs
	git add --all
	git commit -m "publishing docs"
	git push origin gh-pages
