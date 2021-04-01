const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const colors = require('colors');
const path = require('path');

const category = require('./routes/api/category');
const shoppingHistory = require('./routes/api/shoppingHistory');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DATABASE = require('./config/keys').mongoURI;
// console.log(db);
mongoose
  .connect(DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to database'.rainbow))
  .catch((err) => console.log(err));

// app.get('/', (req, res) => {
//   res.send('Welcome to shopify backend');
// });

// use routes
app.use('/api/category', category);
app.use('/api/shoppingHistory', shoppingHistory);

//server static assests in production
if (process.env.NODE_ENV === 'production') {
  //set static file
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running @port ${port}`.magenta);
});
