const express = require('express');
const route = require('./route/route');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');

const port = 5000;

const app = express();
// Parse URL-encoded bodies (for forms submitted via POST method)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (for AJAX requests)
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(route);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log('Server starts');
});
