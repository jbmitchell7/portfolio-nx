const mongoose = require('mongoose');

const PLAYERS_URI = process.env.PLAYERS_URI;

mongoose.connect(PLAYERS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to PLAYERSDB');
  })
  .catch((error) => {
    console.error('Error connecting to PLAYERSDB:', error);
  });