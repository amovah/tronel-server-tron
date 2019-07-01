import tronweb from 'Root/tronweb';
import betadata from 'Root/betdata.json';

async function app() {
  const res = await tronweb.contract().new({
    ...betadata,
    userFeePercentage: 1,
    callValue: 307 * 1000000,
    parameters: [
      process.env.MANAGER,
      'bitcoin',
      100,
      Math.floor(Date.now() / 1000) + 180,
      1,
    ],
  });

  console.log(tronweb.address.fromHex(res.address));
}

app();
