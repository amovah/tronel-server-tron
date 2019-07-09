import tronweb from 'Root/tronweb';
import Bet from 'Root/models/Bet';
import { stop } from 'Root/job';

export default async (betId) => {
  try {
    const bet = await Bet.findById(betId);

    const factory = await tronweb.contract().at(process.env.FACTORY_ADDRESS);
    await factory.lockBet(bet.contractIndex).send({
      shouldPollResponse: true,
    });

    stop(`${bet.id}-setPrice`);

    bet.disabled = (await factory.bets(bet.contractIndex).call()).disabled;
    await bet.save();
  } catch (e) {
    console.error(
      `bet ${betId} went wrong on lock bet`,
      e,
    );
  }
};
