const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routing = require('./routes/ownerRoutes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Yo! baby this end point is working');
});

app.use('/owner', routing);

const DB = process.env.DB?.replace('<PASSWORD>', process.env.DB_PASSWORD);

console.log(DB);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {console.log("DB connected successfully");})
.catch(error => {console.log('error', error);});

app.listen(4321, () => {
  console.log('App is runnning http://localhost:4321/');
})