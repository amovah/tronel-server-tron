import { Router } from 'express';
import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';
import factory from 'Root/contract/factory';
import betContract from 'Root/contract/bet';

const router = new Router();

router.post('/bets', async (req, res) => {
  // const bets = await factory.getBets();
  // const record = await Record.findOne();
  //
  // const newBets = [];
  // if (record.lastIndex < bets.length) {
  //
  // }
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
