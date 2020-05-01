import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
# load flaskenv first
load_dotenv(os.path.join(basedir, '.flaskenv'))
# overwrite with values from env if present
load_dotenv(os.path.join(basedir, '.env'))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'still-in-development'