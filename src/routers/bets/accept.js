import { Router } from 'express';
import { stop } from 'Root/job';
import Bet from 'Root/models/Bet';
import tronweb from 'Root/tronweb';

const router = new Router();

router.put('/bets/:id/accept', async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);
    if (!bet) {
      throw new Error('Bet not found!');
    }

    const betContract = await tronweb.contract().at(bet.address);
    const acceptor = tronweb.address.fromHex(await betContract.acceptor().call());

    if (acceptor !== 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') {
      bet.acceptor = acceptor;
      await bet.save();

      stop(`${bet.id}-retrieveMoney`);
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
