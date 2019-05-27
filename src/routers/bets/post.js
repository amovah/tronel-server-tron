import { Router } from 'express';
import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';

const router = new Router();

router.post('/bets', async (req, res) => {
  // fetching data
  // check for new bet
  // validate creator is joined or not
  // add new bet
  // start job
  // change record state
  res.json({
    status: 'ok',
  });
});

export default router;
