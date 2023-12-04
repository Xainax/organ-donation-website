const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.get("/api/get", (req,res) => {

});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})