import express from 'express';
import { AtBat } from '../models/AtBat';
import { Game } from '../models/Game';

const router = express.Router();
const atBatModel = AtBat;
const gameModel = Game;

// post at-bat
router.post('/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const atBatData = req.body;

    const game = await gameModel.findOne({ id: gameId });
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    await atBatModel.create(atBatData);
    await game.updateOne({ id: gameId }, { $push: { atBats: atBatData } });
    res.status(201).json({ message: 'At-bat created successfully', data: atBatData });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save at-bat' });
  }
});
