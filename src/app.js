import 'babel-polyfill';
import express from 'express';
import { env } from 'process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Record from './models/Record';
import Bet from './models/Bet';
import routes from './routers';
import { start } from './job';
import setPrice from './helpers/setPrice';
import retrieveMoney from './helpers/retrieveMoney';
// import getNewBets from './helpers/getNewBets';

mongoose.connect('mongodb://localhost/tronel', {
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
  const record = await Record.findOne();
  if (!record) {
    const newRecord = new Record();

    await newRecord.save();
  }

  // await getNewBets();

  const bets = await Bet.find({
    done: false,
    disabled: false,
    predictTime: { $gt: Date.now() },
  });

  for (const bet of bets) {
    start(bet.id.toString(), () => {
      setPrice(bet.currency, bet.address);
    }, bet.predictTime * 1000 - Date.now());

    start(`${bet.id.toString()}-retrieve`, () => {
      retrieveMoney(bet.address);
    }, bet.predictTime * 1000 - Date.now() + 60 * 1000);
  }

  const app = express();

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

  app.use(bodyParser.json());

  app.use(routes);

  app.listen(env.NODE_PORT || 8010, () => {
    console.log(`server starts at ${env.NODE_PORT || 8010}`);
  });
})();
