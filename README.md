# cas-interface

A Flask app for intuitive interfacing with Sympy's algebraic solver, differentiator, and integrator.

## Installing

``git clone https://github.com/KChoiSlattery/cas-interface.git``
``git submodule update --init``

## Running the app

``docker build -t cas-interface .``
``docker run -t -p 10000:10000 cas-interface``

Or both at once:
`docker build -t cas-interface . && docker run -t -p 10000:10000 cas-interface`

To interactively connect to the docker instance:
`docker build -t cas-interface . && docker run -it -p 10000:10000 cas-interface /bin/bash`

docker cp cas-interface:/usr/app/requirements.txt
