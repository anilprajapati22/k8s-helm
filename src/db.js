const MongoClient = require('mongodb').MongoClient;
let mongoDB;

const setupDB = callback => {
    console.log("linre 5");
  MongoClient.connect(
    process.env.MONGO_DB_URL,
    (err, client) => {
      if (err) {
        console.log("linre 10");
        return callback(err);
      } else {
        console.log("linre 13");
        mongoDB = client.db(); // Store the DB instance
        return callback(null, 'DB connection successful!');
      }
    }
  );
};

const getDB = () => {
  return mongoDB;
};

module.exports = { setupDB, getDB };
