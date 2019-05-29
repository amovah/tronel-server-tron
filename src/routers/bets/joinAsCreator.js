import { Router } from 'express';
import Bet from 'Root/models/Bet';
import { stop } from 'Root/job';

const router = new Router();

router.put('/bets/:id/joinAsCreator', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) {
      throw new Error('Bet not found!');
    }
    // fetch joiner address from bet contract
    // then check is joinerJoiend or not
    // it joined then do below line
    // stop(`${bet.id.toString()}-retrieve`);

    res.json(bet);
  } catch (e) {
    res.status(400);
    res.json({
      status: 'error',
      error: e,
    });
  }
});

export default router;
