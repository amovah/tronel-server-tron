import { Router } from 'express';
import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';

const router = new Router();

router.post('/bets', async (req, res) => {
  // fetching data
  // check for new bet
  // add new bet
  // change record state
  res.json({
    status: 'OK',
  });
});

export default router;