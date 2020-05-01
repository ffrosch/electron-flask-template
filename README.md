## Based on
https://github.com/matbloch/electron-flask


## Configuration files
files:
  config.py
  config_local.py

Description:
config_local.py MUST NOT be commited to Source Control. It will be used for production!

## Environment Variables
files:
  .env
  .flaskenv

Description:
Variables set on the command line are used over those set in .env, which are used over those set in .flaskenv. .flaskenv should be used for public variables, such as FLASK_APP, while .env should not be committed to your repository so that it can set private variables.