import os
from datetime import timedelta
from dotenv import load_dotenv
from sqlalchemy.orm import DeclarativeBase
import secrets



# Load environment variables from .env file
load_dotenv()

class Config(DeclarativeBase):
    # Use environment variables for the database connection
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    SESSION_COOKIE_SECURE = True  # Send cookies only over HTTPS
    SESSION_COOKIE_HTTPONLY = True  # JavaScript cannot access the session cookie
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes= 2)  # Access Token expiration
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(minutes = 30 ) # Refresh Token expiration
    JWT_TOKEN_LOCATION = ["headers"]


