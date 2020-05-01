# A template to easily deploy flask apps with Electron
#### Electron Startup Screen
![Electron Startup Screen](/docs/img/Electron-Startup-Screen.jpg)

#### Electron Window after Flask is initialized
![Electron Window after Flask is initialized](/docs/img/Electron-Flask-Window.jpg)

## Resources
* based on [electron-flask](https://github.com/matbloch/electron-flask)

### Dependencies
* [Node.js](https://nodejs.org/en/)
* [Python](https://www.python.org/)

# Setup
###### Install Dependencies
* Install Node.js
* Install Python
###### Clone the Repository
* `git clone https://github.com/Sturmpuls/electron-flask-template.git`
* `cd electron-flask-template`
###### Install the dependencies for Electron from `package.json`
* `npm install`
###### Create a Python Virtual Environment
* `pip install virtualenv`
* `virtualenv env --copies --clear`
###### Install the dependencies for Flask from `requirements.txt` into the Virtual Environment
* `source env/Scripts/activate`
* `pip install -r requirements.txt`

# Run the Application
Activate the Virtual Environment for Python `source env/Scripts/activate`
###### Start Electron + Flask
`npm start`

###### Start Flask
`flask run`

###### Compile Electron + Flask
`npm package`

###### Compile Flask
`npm package-python`

## Settings
###### Flask
* ./config.py - can be used for development, will be committed.
* ./config_local.py - should be used for production, will NOT be committed.
###### Environment
* /.flaskenv - can be used for development, will be committed.
* /.env - should be used for production, will NOT be committed. Variables set here are used over those set in .flaskenv.
###### Packaging
The packaging for both flask and electron is configured in `package.json`.
