import unirest from 'unirest';
import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';

export default async (betId) => {
  try {
    const bet = await Bet.findById(betId);

    const res = await unirest
      .get(`https://api.coinmarketcap.com/v1/ticker/${bet.currency}/?convert=USD`)
      .headers({
        Accept: 'application/json',
      });

    if (res.body.error) {
      throw Error('cannot get currency price.');
    }

    const price = Math.floor(parseInt(res.body[0].price_usd, 10));
    const betContract = await tronweb.contract().at(bet.address);

    await betContract.setPrice(price).send({
      shouldPollResponse: true,
    });

    bet.done = await betContract.done().call();
    bet.submittedPrice = await betContract.submittedPrice().call();

    await bet.save();
  } catch (e) {
    console.error(
      `bet ${betId} went wrong!`,
      e,
    );
  }
};
