const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.json());

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

// route for donors
app.get('/donors', (req, res) => {
  const query = 'SELECT * from donor';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

// route for recipients
app.get('/recipients', (req, res) => {
  const query = 'SELECT * from recipient';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

// route for priority
app.get('/priority', (req, res) => {
  const query = 'SELECT * from priority';
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
});

// route to add new data into priority
app.post('/create-priority', (req, res) => {
  const query = 'INSERT INTO priority (organType, priority) VALUES (?, ?)';
  const values = [
    req.body.OrganType,
    req.body.Priority,
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({message: 'Data Added Successfully', insertedId: results.insertId });
    }
  });
});

// route to update data in priority
app.put('/update-donor', (req, res) => {
  const donorID = req.body.DonorID;
  const query = 'UPDATE donor SET Fname = ?, Lname = ?, OrgansDonating = ?, BloodType = ?, Gender = ?, Hospital = ? where DonorID = ?';
  const values = [
    req.body.Fname,
    req.body.Lname,
    req.body.OrgansDonating,
    req.body.BloodType,
    req.body.Gender,
    req.body.Hospital,
    donorID
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({message: 'Data Updated Successfully', affectedRows: results.affectedRows });
      console.log(req.body);
      console.log('Update Query:', query);
      console.log('Update Values:', values);
    }
  });
});

// route to delete row in recipient
app.delete('/delete-recipient/:recipientID', (req, res) => {
  const recipientID = req.params.recipientID;
  const query = 'DELETE FROM Recipient WHERE RecipientID = ?';
  const values = [recipientID];

  db.query(query, values, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      if (results.affectedRows > 0) {
        res.json({ message: 'Recipient Deleted Successfully', affectedRows: results.affectedRows });
      } else {
        res.status(404).json({ message: 'Recipient Not Found or Deletion Unsuccessful', affectedRows: 0 });
      }
    }
  });
});

  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });