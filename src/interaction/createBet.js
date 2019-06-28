import tronweb from 'Root/tronweb';

async function app() {
  const factory = await tronweb.contract().at(process.env.FACTORY_ADDRESS);

  console.log(factory);
}

app();
