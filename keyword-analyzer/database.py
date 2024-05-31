import os

from sqlalchemy import create_engine, Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# Define the database URI
DATABASE_URI = os.getenv('DATABASE_URI', 'postgresql+psycopg2://postgres:karambol@localhost/AISearch_Analythics')

# Create the database engine
engine = create_engine(DATABASE_URI)

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
