import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';

export default async (betId) => {
  try {
    const bet = await Bet.findById(betId);

    const betContract = await tronweb.contract().at(bet.address);
    await betContract.retrieveMoney().send({
      shouldPollResponse: true,
    });

    bet.done = await betContract.done().call();
    await bet.save();
  } catch (e) {
    console.error(
      `bet ${betId} went wrong on retrieveMoney`,
      e,
    );
  }
};
