import tronweb from 'Root/tronweb';
import betadata from 'Root/betdata.json';

async function app() {
  const res = await tronweb.contract().new({
    ...betadata,
    feeLimit: 1000000000,
    userFeePercentage: 1,
    callValue: 100,
    parameters: [
      process.env.MANAGER,
      'bitcoin',
      100,
      Math.floor(Date.now() / 1000 + 1000),
      1,
    ],
  });

  console.log(res);
}

app();
