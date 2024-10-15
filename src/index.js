const express = require('express');
const app = express();
const port = process.env.PORT;
const { setupDB } = require('./db');


console.log('MongoDB URL:', process.env.MONGO_DB_URL);

setupDB((err, success) => {
    if (err) {
      console.error('Failed to connect to the database:', err);
      throw err;
    }
    console.log(success);
    
    const func = (req, res) => {
      res.json('Success!');
    };
    
    app.get('/', func);
    app.get('/healthcheck', func);
    
    app.listen(port, () => {
      console.log(`🚀  Server is running! Listening on port ${port}`);
    });
  });