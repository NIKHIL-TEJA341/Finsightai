import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()

# MongoDB Atlas connection string
MONGODB_URL = os.getenv("MONGODB_URL")

class Database:
    client: AsyncIOMotorClient = None
    db = None

database = Database()

def get_db():
    if database.client is None:
        if not MONGODB_URL:
            # Fallback to local if no string provided, or raise error
            print("WARNING: MONGODB_URL not found in environment, falling back to local MongoDB.")
            database.client = AsyncIOMotorClient("mongodb://localhost:27017")
        else:
            database.client = AsyncIOMotorClient(MONGODB_URL)
        # Assuming writing to a database named 'finsightai'
        database.db = database.client['finsightai']
    return database.db

# Define helpers for collections
def get_entities_collection():
    return get_db()["entities"]

def get_documents_collection():
    return get_db()["documents"]
