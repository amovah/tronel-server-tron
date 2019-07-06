import { Router } from 'express';
import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';
import setPrice from 'Root/helpers/setPrice';
import retrieveMoney from 'Root/helpers/retrieveMoney';
import { start } from 'Root/job';

const router = new Router();

router.post('/bets', async (req, res) => {
  try {
    const betContract = await tronweb.contract().at(req.body.address);

    const summary = await betContract.getSummary().call();
    const validator = await betContract.validator().call();

    const data = {
      creator: tronweb.address.fromHex(summary[0]),
      currency: summary[2],
      predictionPrice: summary[3].toNumber(),
      predictionTime: summary[4].toNumber(),
      predictionType: summary[5],
      submittedPrice: summary[6].toNumber(),
      betAmount: summary[7].toNumber(),
      lockTime: summary[8].toNumber(),
      disabled: summary[9],
      done: summary[10],
      address: req.body.address,
    };

    if (
      validator[0] === data.currency
      && validator[1].toNumber()
      === data.predictionPrice + data.predictionTime + data.predictionType
    ) {
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
