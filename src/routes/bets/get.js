import { Router } from 'express';
import Bet from 'Root/models/Bet';

const router = new Router();

router.get('/bets', async (req, res) => {
  const bets = await Bet.find();
  res.json(bets);
});

export default router;
