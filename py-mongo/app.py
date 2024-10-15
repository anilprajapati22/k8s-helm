from flask import Flask, jsonify
from pymongo import MongoClient
import os

app = Flask(__name__)

mongo_client = None

def setup_db():
    global mongo_client
    try:
        mongo_url = os.getenv('MONGO_DB_URL')
        print(f"MongoDB URL: {mongo_url}")
        mongo_client = MongoClient(mongo_url)
        # Test connection by listing databases
        mongo_client.server_info()
        print("DB connection successful!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        raise e

@app.route('/')
def index():
    return jsonify({"message": "Success!"})

@app.route('/healthcheck')
def healthcheck():
    if mongo_client is not None:
        return jsonify({"status": "healthy"})
    else:
        return jsonify({"status": "unhealthy"}), 500

if __name__ == '__main__':
    setup_db()
    port = int(os.getenv('PORT', 80))
    app.run(host='0.0.0.0', port=port)
