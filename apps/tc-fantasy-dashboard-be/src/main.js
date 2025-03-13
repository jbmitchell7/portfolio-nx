const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const playerController = require('./controllers/playerController');
const app = express();

require('dotenv').config();
require('./dbs/players-db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/players', playerController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});