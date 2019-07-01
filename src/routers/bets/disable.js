import { Router } from 'express';
import Bet from 'Root/models/Bet';
import { stop } from 'Root/job';
import tronweb from 'Root/tronweb';

const router = new Router();

router.put('/bets/:id/disable', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) {
      throw new Error('Bet not found!');
    }

    const betContract = await tronweb.contract().at(bet.address);
    bet.disabled = await betContract.disabled().call();

    if (bet.disabled) {
      stop(`${bet.id}-setPrice`);
      stop(`${bet.id}-retrieveMoney`);

      await bet.save();
    }

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
