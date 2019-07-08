import tronweb from 'Root/tronweb';
import betadata from 'Root/betdata.json';

async function app() {
  // const contract = await tronweb.contract().at('TVpWcabE46Sj3FcdNnQ3yf1Vmt5t4gm4vg');
  //
  // const res = await contract.createBet(
  //   "bitcoin",
  //   1000,
  //   Math.floor(Date.now() / 1000 + 500),
  //   Math.floor(Date.now() / 1000 + 400),
  //   1,
  //   25 * 1000000,
  // ).send({
  //   callValue: 25 * 1000000,
  //   shouldPollResponse: true,
  // });
  //
  // console.log(res);
  const contract = await tronweb.contract().at('TVpWcabE46Sj3FcdNnQ3yf1Vmt5t4gm4vg');

  const res = await contract.getSummary(0).call();

  console.log(res);
}

app();
