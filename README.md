# A template to easily deploy flask apps with Electron

## Resources
* based on [electron-flask](https://github.com/matbloch/electron-flask)

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [Python](https://www.python.org/)

## Setup
###### Install Dependencies
1. Install Node.js
1. Install Python
###### Clone the Repository
1. `git clone https://github.com/Sturmpuls/electron-flask-template.git`
1. `cd electron-flask-template`
###### Install the dependencies for Electron from `package.json`
1. `npm install`
###### Create a Python Virtual Environment
1. `pip install virtualenv`
1. `virtualenv env --copies --clear`
###### Install the dependencies for Flask from `requirements.txt` into the Virtual Environment
1. `source env/Scripts/activate`
1. `pip install -r requirements.txt`

# Run the Application
Activate the Virtual Environment for Python `source env/Scripts/activate`
## Start Electron + Flask
`npm start`

## Start Flask
`flask run`

## Compile Electron + Flask
`npm package`

## Compile Flask
`npm package-python`

## Settings
###### Flask
* ./config.py - can be used for development, will be committed.
* ./config_local.py - should be used for production, will NOT be committed.
###### Environment
* /.flaskenv - can be used for development, will be committed.
* /.env - should be used for production, will NOT be committed. Variables set here are used over those set in .flaskenv.
