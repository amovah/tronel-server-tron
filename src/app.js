import express from 'express';
import { env } from 'process';

const app = express();

app.listen(env.NODE_PORT || 8010, () => {
  console.log(`server starts at ${env.NODE_PORT || 8010}`);
});
