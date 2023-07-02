const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/');

const app = express();

app.use(express.json());

app.use('/owner', routes.ownerRoutes);
app.use('/admin', routes.adminRoutes);

const DB = process.env.DB?.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {console.log("DB connected successfully");})
.catch(error => {console.log('error', error);});

app.listen(4321, () => {
  console.log('App is runnning http://localhost:4321/');
})