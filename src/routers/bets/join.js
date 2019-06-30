import { Router } from 'express';
import Bet from 'Root/models/Bet';
// import { stop } from 'Root/job';

const router = new Router();

router.put('/bets/:id/join', async (req, res) => {
  // try {
  //   const bet = await Bet.findById(req.params.id);
  //   if (!bet) {
  //     throw new Error('Bet not found!');
  //   }
  //
  //   const joiner = betContract.joiner();
  //   if (joiner !== '0x0000000000000000000000000000000000000000') {
  //     bet.joiner = joiner;
  //     bet.save();
  //
  //     // stop(`${bet.id.toString()}-retrieve`);
  //   }
  //
  //   res.json(bet);
  // } catch (e) {
  //   res.status(400);
  //   res.json({
  //     status: 'error',
  //     error: e,
  //   });
  // }
});

export default router;
