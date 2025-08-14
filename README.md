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
  - Make virtual environment: ``python3 -m venv venv``
  - Activate the virtual environment, this is different for linux/windows
    - Windows: ``venv\Scripts\activate.bat``
    - Linux: ``source venv/bin/activate``
  - Install requirements: ``pip install -r requirements.txt``
- Docker image:
  - If on windows, make sure the Docker Desktop app is running
  - Build the docker image: `docker-compose build`

## Using the Docker environment
To run the image:

- Create a container: `docker-compose up -d`
- Open the VS Code comment palette by pressing `ctrl+shift+p`
- Run the command `Dev Containers: Attach to Running Container`
- Select the container that you’ve just started

This should open a new VS Code window, which you will use to develop your code. When you are done:

- Ensure your changes are saved
- Close the Dev Container VS Code window
- In the terminal in the original VS Code window, run `docker-compose down`