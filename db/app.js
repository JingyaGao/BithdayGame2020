// reads in our .env file and makes those values available as environment variables
require('dotenv').config();
 
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/main');
const secureRoutes = require('./routes/secure');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');
const passport = require('passport');

// setup mongo connection
const uri = process.env.MONGO_CONNECTION_URL;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.connection.on('error', (error) => {
  console.log(error);
  process.exit(1);
});
mongoose.connection.on('connected', function () {
  console.log('connected to mongo');
});


// default connection using mongodb driver
// const MongoClient = require('mongodb').MongoClient;
// const uri = process.env.MONGO_CONNECTION_URL;
// //console.log(uri);
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(err);
//   // perform actions on the collection object
//   client.close();
// });
 
// create an instance of an express app
const app = express();
 
// update express settings
//app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
//app.use(bodyParser.json()); // parse application/json
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser());
 
// require passport auth
require('./auth/auth');

// app.get('/game.html', passport.authenticate('jwt', { session : false }), function (req, res) {
//   res.sendFile(__dirname + '/../game.html');
// });
app.use(express.static(__dirname + '/..'));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.use('/', routes);
app.use('/', secureRoutes);
//app.use('/', passport.authenticate('jwt', { session : false }), secureRoutes);
 
// catch all other routes
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: '404 - Not Found' });
});
 
// handle errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});
 
// have the server start listening on the provided port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on port ${process.env.PORT || 3000}`);
});