const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database:"organDonation" 
});

db.connect((err) => {
    if (err) {
        console.error('MySQL Connection Error: ', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// route for available organs
app.get('/available', (req, res) => {
    const query = 'SELECT * from available';
    db.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.json(results);
      }
    });
  });

// route for organ requests
  app.get('/requests', (req, res) => {
    const query = 'SELECT * from requests';
    db.query(query, (error, results) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.json(results);
      }
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });