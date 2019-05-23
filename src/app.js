import express from 'express';
import { env } from 'process';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.listen(env.NODE_PORT || 8010, () => {
  console.log(`server starts at ${env.NODE_PORT || 8010}`);
});
