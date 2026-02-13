import express from 'express';
import { Player } from '../models/Player';

const router = express.Router();
const playerModel = Player;

// post at-bat
router.post('/:player/:year/:gameNumber', async (req, res) => {
  try {
    const { player: playerName, year, gameNumber } = req.params;
    const atBatData = req.body;

    // Find player by name
    const playerDoc = await playerModel.findOne({ name: playerName });
    if (!playerDoc) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Find season within player's seasons
    const season = playerDoc.seasons.find(s => s.year === parseInt(year));
    if (!season) {
      return res.status(404).json({ error: `Season ${year} not found for player ${playerName}` });
    }

    // Find game within season's games
    const game = season.games.find(g => g.gameNumber === parseInt(gameNumber));
    if (!game) {
      return res.status(404).json({ error: `Game ${gameNumber} not found in ${year} season` });
    }

    // Add at-bat to game's atBats array
    game.atBats.push(atBatData);

    // Save the player document (which updates all nested data)
    await playerDoc.save();

    res.status(201).json({ 
      message: 'At-bat created successfully', 
      data: atBatData 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save at-bat' });
  }
});
