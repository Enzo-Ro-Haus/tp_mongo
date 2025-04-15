const express = require('express');
const mongoose = require('mongoose');
const { config } = require('dotenv');
const bodyParser = require('body-parser');
config();

const userRoutes = require('./routes/user.routes');

const app = express();

//Pasea el body que recibe
app.use(bodyParser.json())

//Conectamos a bd
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB})
const db = mongoose.connection;

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Server on port ${port}`)
})

app.use('/users', userRoutes);