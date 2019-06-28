import tronweb from 'Root/tronweb';

async function app() {
  const factory = await tronweb.contract().at(process.env.SMART_CONTRACT_ADDRESS);

  console.log(factory);
}

app();
