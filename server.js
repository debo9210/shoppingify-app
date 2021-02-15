const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const colors = require('colors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to shopify backend');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running @port ${port}`.magenta);
});
