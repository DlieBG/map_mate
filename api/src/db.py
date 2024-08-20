from dotenv import load_dotenv, find_dotenv
from pymongo import MongoClient
import os

load_dotenv(find_dotenv())

_mongo = MongoClient(
    host=os.getenv('MONGO_URI'),
)
_db = _mongo.get_database('map_mate')

projects = _db.get_collection('projects')
marker_groups = _db.get_collection('marker-groups')
markers = _db.get_collection('markers')
