import { Router } from 'express';
import getNewBets from 'Root/helpers/getNewBets';

const router = new Router();

router.post('/bets', async (req, res) => {
  try {
    const bets = await getNewBets();

    res.json({
      bets,
    });
  } catch (e) {
    res.status(400);
    res.json({
      status: 'error',
      error: e,
    });
  }
});

export default router;
