import Bet from 'Root/models/Bet';
import Record from 'Root/models/Record';
import factoryContract from 'Root/contracts/factory';
import betContract from 'Root/contracts/bet';
import setPrice from 'Root/helpers/setPrice';
import retrieveMoney from 'Root/helpers/retrieveMoney';
import { start } from 'Root/job';

export default async () => {
  const factory = await factoryContract();
  const bets = await factory.getBets().call();
  const record = await Record.findOne();

  const newBets = [];
  if (record.lastIndex < bets.length - 1) {
    newBets.push(...bets.slice(record.lastIndex + 1));

    // record.lastIndex = newBets.length - 1;
    // await record.save();
  }

  console.log(bets);
  const affsa = await betContract('TBMx8oXaQCe83vDxXuQsigjLRqCvbfUxVo');
  const res = await affsa.creator().call();
  console.log(res);

  // const data = [];
  // await Promise.all(newBets.map(async (betAddress) => {
  //   console.log(betAddress);
  //   const bet = await betContract(betAddress);
  //   const gathered = {
  //     address: betAddress,
  //   };
  //
  //   const res = await bet.getSummary().call();
  //   console.log(res);
  //
  //   data.push(gathered);
  // }));

  const showUser = [];
  // await Promise.all(data.map(async (newBet) => {
  //   const bet = new Bet(newBet);
  //   showUser.push(newBet);
  //
  //   start(
  //     bet.id,
  //     () => { setPrice(bet.currency, bet.address); },
  //     bet.predictTime * 1000 - Date.now(),
  //   );
  //
  //   start(
  //     `${bet.id}-retrieveMoney`,
  //     () => { retrieveMoney(bet.address); },
  //     bet.predictTime * 1000 - Date.now() + 60 * 1000,
  //   );
  //
  //   await bet.save();
  // }));

  return showUser;
};
