import express from 'express';
import { Player } from '../models/Player';

const router = express.Router();
const playerModel = Player;

// get player by username
router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Find player by name
    const playerDoc = await playerModel.findOne({ username });
    if (!playerDoc) {
      return res.status(404).json({ error: 'Player not found' });
    }

    res.status(201).json(playerDoc);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get player' });
  }
});

// add season to player
router.post('/:username/seasons/:year', async (req, res) => {
  try {
    const { username, year } = req.params;
    const seasonData = req.body;

    // Find player by name
    const playerDoc = await playerModel.findOne({ username });
    if (!playerDoc) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Add season to player's seasons map
    playerDoc.seasons.set(
      year,
      {
        games: [],
        ...seasonData
      }
    );

    // Save the player document (which updates all nested data)
    await playerDoc.save();

    res.status(201).json({ 
      message: 'Season created successfully', 
      data: seasonData 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save season' });
  }
});

// add game to season
router.post('/:username/seasons/:year/games', async (req, res) => {
  try {
    const { username, year } = req.params;
    const gameData = req.body;

    // Find player by name
    const playerDoc = await playerModel.findOne({ username });
    if (!playerDoc) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Find season within player's seasons
    const season = playerDoc.seasons.get(year);
    if (!season) {
      return res.status(404).json({ error: `Season ${year} not found for player ${username}` });
    }

    // Add game to season's games array
    season.games.push({
      gameNumber: season.games.length + 1,
      atBats: [],
      ...gameData
    });

    // Save the player document (which updates all nested data)
    await playerDoc.save();

    res.status(201).json({ 
      message: 'Game created successfully', 
      data: gameData 
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save game' });
  }
});

// add at-bat to game
router.post('/:username/seasons/:year/games/:gameNumber', async (req, res) => {
  try {
    const { username, year, gameNumber } = req.params;
    const atBatData = req.body;

    // Find player by name
    const playerDoc = await playerModel.findOne({ username });
    if (!playerDoc) {
      return res.status(404).json({ error: 'Player not found' });
    }

    // Find season within player's seasons
    const season = playerDoc.seasons.get(year);
    if (!season) {
      return res.status(404).json({ error: `Season ${year} not found for player ${username}` });
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

export default router;
