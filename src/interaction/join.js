import tronweb from 'Root/tronweb';

async function app() {
  const bet = await tronweb.contract().at('TVWmQKmaJNowQewdGz16ekW2jQgXwaAfCc');

  const res = await bet.join().send({
    shouldPollResponse: true,
  });

  console.log(res);
}

app();
