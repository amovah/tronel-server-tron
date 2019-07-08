import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';

export default async (betId) => {
  try {
    const bet = await Bet.findById(betId);

    const factory = await tronweb.contract().at(process.env.FACTORY_ADDRESS);
    await factory.retrieveMoney(bet.contractIndex).send({
      shouldPollResponse: true,
    });

    bet.done = (await factory.bets(bet.contractIndex).call()).done;
    await bet.save();
  } catch (e) {
    console.error(
      `bet ${betId} went wrong on retrieveMoney`,
      e,
    );
  }
};
