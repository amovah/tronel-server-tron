import unirest from 'unirest';

export default async (currency, address) => {
  const res = await unirest
    .get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest')
    .headers({
      Accept: 'application/json',
      'X-CMC_PRO_API_KEY': 'db19dbaf-413d-4fbf-88d7-ada566399e94',
    })
    .query({
      slug: currency,
    });

  const price = Math.floor(res.body.data[Object.keys(res.body.data)[0]].quote.USD.price);

  console.log(price, address);
};
