import 'babel-polyfill';
import express from 'express';
import { env } from 'process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Bet from './models/Bet';
import routes from './routers';
import { start } from './job';
import setPrice from './helpers/setPrice';
import lockBet from './helpers/lockBet';

mongoose.connect(`mongodb://localhost/${process.env.DATABASE}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.connection.on('error', (error) => {
  console.error(`Database connection error ${error}`);

  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected from database');

  process.exit(0);
});

(async () => {
  const bets = await Bet.find({
    done: false,
    disabled: false,
    specifiedDate: { $gt: Date.now() / 1000 },
  });

  for (const bet of bets) {
    start(
      `${bet.id}-setPrice`,
      () => { setPrice(bet.id); },
      bet.specifiedDate * 1000 - Date.now(),
    );

    start(
      `${bet.id}-lockBet`,
      () => { lockBet(bet.id); },
      bet.lockTime * 1000 - Date.now() + 10000,
    );
  }

  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    next();
  });

  app.use(bodyParser.json());

  app.use(routes);

  app.listen(env.NODE_PORT || 8010, () => {
    console.log(`server starts at ${env.NODE_PORT || 8010}`);
  });
})();
