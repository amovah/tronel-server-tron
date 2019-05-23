import express from 'express';
import { env } from 'process';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/tronel', { useNewUrlParser: true });
mongoose.connection.on('error', (error) => {
  console.error(`Database connection error ${error}`);

  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected from database');

  process.exit(0);
});


const app = express();

app.use(bodyParser.json());

app.listen(env.NODE_PORT || 8010, () => {
  console.log(`server starts at ${env.NODE_PORT || 8010}`);
});
