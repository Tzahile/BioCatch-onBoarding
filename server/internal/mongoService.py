from pymongo import MongoClient
from pymongo.collection import Collection

mongo_client = MongoClient("mongodb://localhost:27017")
db = mongo_client["tzahiDB"]
sessions_connection: Collection = db["sessions"]
