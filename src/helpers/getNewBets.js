import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';
import factory from 'Root/contract/factory';
import betContract from 'Root/contract/bet';
import setPrice from 'Root/helpers/setPrice';
import retrieveMoney from 'Root/helpers/retrieveMoney';
import { start } from 'Root/job';

export default async () => {
  const bets = factory.getBets();
  const record = await Record.findOne();

  const newBets = [];
  if (record.lastIndex < bets.length - 1) {
    newBets.push(...bets.slice(record.lastIndex + 1));

    record.lastIndex = newBets.length - 1;
    await record.save();
  }

  const data = [];
  for (const betAddress of newBets) {
    const bet = betContract(betAddress);
    const gathered = {
      address: betAddress,
    };
    gathered.creator = bet.creator();
    gathered.joiner = bet.joiner();
    gathered.currency = bet.currency();
    gathered.predictPrice = bet.predictPrice();
    gathered.predictTime = bet.predictTime();
    gathered.predictType = bet.predictType();
    gathered.submittedPrice = bet.submittedPrice();
    gathered.done = bet.done();
    gathered.disabled = bet.disabled();
    gathered.balance = bet.getBalance();

    // actions.push(
    //   (async () => {
    //     const bet = betContract(betAddress);
    //     const gathered = {
    //       address: betAddress,
    //     };
    //
    //     await Promise.all(
    //       (async () => {
    //         gathered.creator = await bet.creator();
    //       })(),
    //
    //       (async () => {
    //         gathered.joiner = await bet.joiner();
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //
    //       (async () => {
    //       })(),
    //     );
    //
    //     data.push(gathered);
    //   })(),
    // );
  }

  const showUser = [];
  await Promise.all(data.map(async (newBet) => {
    const bet = new Bet(newBet);
    showUser.push(newBet);

    start(
      bet.id,
      () => { setPrice(bet.currency, bet.address); },
      bet.predictTime * 1000 - Date.now(),
    );

    start(
      `${bet.id}-retrieveMoney`,
      () => { retrieveMoney(bet.address); },
      bet.predictTime * 1000 - Date.now() + 60 * 1000,
    );

    await bet.save();
  }));

  return showUser;
};
