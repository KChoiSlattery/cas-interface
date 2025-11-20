# cas-interface

A Flask app for intuitive interfacing with Sympy's algebraic solver, differentiator, and integrator. Currently only the solver is implemented. It is hosted for free at <https://math-tools-nlyt.onrender.com/solver>, but running it locally makes it much faster for complicated equations.

## Installing

``git clone https://github.com/KChoiSlattery/cas-interface.git``

## Running the app

- Build Docker image: ``docker build -t cas-interface .``
- Run Docker container: ``docker run -t -p 10000:10000 cas-interface``
- Go to http://localhost:10000/

Or both at once:
`docker build -t cas-interface . && docker run -t -p 10000:10000 cas-interface`

To interactively connect to the docker container:
`docker build -t cas-interface . && docker run -it -p 10000:10000 cas-interface /bin/bash`