const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const routes = require('./routes/');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/owner', routes.ownerRoutes);
app.use('/admin', routes.adminRoutes);
app.use('/order', routes.orderRoutes);

app.use('*', (req, res) => {
  res.status(400).json({
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

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