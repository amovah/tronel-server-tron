import unirest from 'unirest';

export default async (currency, address) => {
  // const res = await unirest
  //   .get(`https://api.coinmarketcap.com/v1/ticker/${currency}/?convert=USD`)
  //   .headers({
  //     Accept: 'application/json',
  //   });
  //
  // if (res.body.error) {
  //   return;
  // }
  //
  // const price = Math.floor(parseInt(res.body[0].price_usd, 10));
  // const bet = betContract(address);
  //
  // bet.setPrice(price);
  //
  // console.log(price, address);
};
