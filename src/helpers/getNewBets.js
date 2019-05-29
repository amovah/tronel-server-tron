import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';
import factory from 'Root/contract/factory';
import betContract from 'Root/contract/bet';
import setPrice from 'Root/helpers/setPrice';
import retrieveMoney from 'Root/helpers/retrieveMoney';
import { start } from 'Root/job';

export default async () => {
  const bets = await factory.getBets();
  const record = await Record.findOne();

  const newBets = [];
  if (record.lastIndex < bets.length - 1) {
    newBets.push(...bets.slice(record.lastIndex + 1));

    record.lastIndex = newBets.length - 1;
    await record.save();
  }

  const actions = [];
  const data = [];
  for (const betAddress of newBets) {
    actions.push(
      (async () => {
        const bet = betContract(betAddress);
        const gathered = {
          address: betAddress,
        };

        await Promise.all(
          (async () => {
            gathered.creator = await bet.creator();
          })(),

          (async () => {
            gathered.creatorJoined = await bet.creatorJoined();
          })(),

          (async () => {
            gathered.joiner = await bet.joiner();
          })(),

          (async () => {
            gathered.joinerJoined = await bet.joinerJoined();
          })(),

          (async () => {
            gathered.currency = await bet.currency();
          })(),

          (async () => {
            gathered.predictPrice = await bet.predictPrice();
          })(),

          (async () => {
            gathered.predictTime = await bet.predictTime();
          })(),

          (async () => {
            gathered.predictType = await bet.predictType();
          })(),

          (async () => {
            gathered.submittedPrice = await bet.submittedPrice();
          })(),

          (async () => {
            gathered.submittedPrice = await bet.submittedPrice();
          })(),

          (async () => {
            gathered.done = await bet.done();
          })(),

          (async () => {
            gathered.disabled = await bet.disabled();
          })(),

          (async () => {
            gathered.balance = await bet.getBalance();
          })(),
        );

        data.push(gathered);
      })(),
    );
  }
  await Promise.all(actions);

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
