import os
from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy_utils import database_exists, create_database

# Retrieve database connection details from environment variables
db_user = os.getenv('DB_USER', 'postgres')
db_password = os.getenv('DB_PASSWORD', 'karambol')
db_host = os.getenv('DB_HOST', 'localhost')
db_port = os.getenv('DB_PORT', '5432')  # Default PostgreSQL port
database_name = os.getenv('DATABASE_NAME', 'AISearch_Analythics')

# Define the database URI
DATABASE_URI = f'postgresql+psycopg2://{db_user}:{db_password}@{db_host}:{db_port}/{database_name}'

# Create an engine for the database
engine = create_engine(DATABASE_URI)

# Create the database if it does not exist
if not database_exists(engine.url):
    create_database(engine.url)
    print(f"Database {database_name} created.")
else:
    print(f"Database {database_name} already exists.")

# Create a base class for declarative class definitions
Base = declarative_base()

# Define the Document table
class Document(Base):
    __tablename__ = 'documents'
    id = Column(Integer, primary_key=True, autoincrement=True)
    content = Column(Text, nullable=False)
    externalId = Column(Integer, nullable=False)

# Define the Keyword table
class Keyword(Base):
    __tablename__ = 'keywords'
    id = Column(Integer, primary_key=True, autoincrement=True)
    document_id = Column(Integer, ForeignKey('documents.id'), nullable=False)
    keyword = Column(String, nullable=False)
    score = Column(Float, nullable=False)

    document = relationship("Document", back_populates="keywords")

# Define the relationship in Document
Document.keywords = relationship("Keyword", order_by=Keyword.id, back_populates="document")

# Create the tables in the database
Base.metadata.create_all(engine)

# Create a session maker
Session = sessionmaker(bind=engine)
