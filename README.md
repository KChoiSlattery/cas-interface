# cas-interface

A Flask app for intuitive interfacing with Sympy's algebraic solver, differentiator, and integrator. 

## Running the app

If no changes have been made: ``npm run app``. Otherwise, build from source and then run.

## Building from source

- Clean the ``dist`` folder: ``npm run clean``
- Build: ``npm run build``

To run the whole build/run pipeline: ``npm run start``

## Setting up enviroments

- Install all required node modules: ``npm install``
- Python venv:
  - Make virtual environment: ``python -m virtualenv venv``
  - Activate the virtual environment, this is different for linux/windows
  - Install requirements: ``pip install -r requirements.txt``
