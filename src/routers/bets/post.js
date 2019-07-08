import { Router } from 'express';
import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';
import setPrice from 'Root/helpers/setPrice';
import retrieveMoney from 'Root/helpers/retrieveMoney';
import { start } from 'Root/job';

const router = new Router();

router.post('/bets', async (req, res) => {
  try {
    const factory = await tronweb.contract().at(process.env.FACTORY_ADDRESS);
    const summary = await factory.getSummary(req.body.contractIndex).call();

    const data = {
      creator: tronweb.address.fromHex(summary.creator),
      currency: summary.currency,
      predictionPrice: summary.predictionPrice.toNumber(),
      specifiedDate: summary.specifiedDate.toNumber(),
      lockTime: summary.lockTime.toNumber(),
      predictionType: summary.predictionType,
      submittedPrice: summary.submittedPrice.toNumber(),
      betAmount: summary.betAmount.toNumber(),
      disabled: summary.disabled,
      done: summary.done,
      contractIndex: req.body.contractIndex,
    };

    if (data.creator !== 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') {
      const bet = new Bet(data);
      await bet.save();

      start(
        `${bet.id}-setPrice`,
        () => { setPrice(bet.id); },
        bet.predictionTime * 1000 - Date.now(),
      );

      start(
        `${bet.id}-retrieveMoney`,
        () => { retrieveMoney(bet.id); },
        bet.predictionTime * 1000 - Date.now() + 60 * 1000,
      );

      res.json(bet);
    } else {
      throw Error('Invalid Contract');
    }
  } catch (e) {
    res.status(400);
    res.json({
      status: 'error',
      error: e,
    });
  }
});

export default router;
