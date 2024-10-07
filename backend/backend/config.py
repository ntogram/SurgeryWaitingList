import os
from dotenv import load_dotenv
from sqlalchemy.orm import DeclarativeBase
# Load environment variables from .env file
load_dotenv()

class Config(DeclarativeBase):
    # Use environment variables for the database connection
    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{os.getenv('DB_USERNAME')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False


