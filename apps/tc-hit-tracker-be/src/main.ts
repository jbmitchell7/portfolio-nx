import express from 'express';
import * as path from 'path';
import mongoose from 'mongoose';
import playerRouter from './controllers/playerController';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Initialize MongoDB connection
const mongoUri = process.env.HIT_TRACKER_DB_DEV_URI;

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to tc-hit-tracker-be!' });
});

app.use('/api/players', playerRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
