import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {playerController} from './controllers/playerController';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 3000;
const PLAYERS_URI = process.env.PLAYERS_URI;

mongoose.connect(PLAYERS_URI)
  .then(() => {
    console.log('Connected to PLAYERSDB');
  })
  .catch((error) => {
    console.error('Error connecting to PLAYERSDB:', error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/players', playerController);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
