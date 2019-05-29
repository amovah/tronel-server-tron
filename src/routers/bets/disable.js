import { Router } from 'express';
import Bet from 'Root/models/Bet';
import betContract from 'Root/contract/bet';

const router = new Router();

router.put('/bets/:id/disable', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) {
      throw new Error('Bet not found!');
    }

    bet.disabled = await betContract(bet.address).disabled();
    await bet.save();

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
