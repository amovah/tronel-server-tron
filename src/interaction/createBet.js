import loadFactory from 'Root/contracts/factory';

async function app() {
  const factory = await loadFactory();

  const res = await factory.createBet(
    'bitcoin',
    100,
    Math.floor(Date.now() / 1000 - 100),
    1,
  ).send({
    shouldPollResponse: true,
  });

  console.log(res);
}

app();
