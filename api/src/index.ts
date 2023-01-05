import express, { Application } from 'express';
import db from './config/db.config';
import router from './routes/apiRouter';
import cors from 'cors';
import path from 'path';

const app: Application = express();

const PORT = process.env.API_PORT || 5000;

async function runServer() {
  try {
    await db.sync();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.log(`Error!:${error}`);
  }

  app.use(cors())
  app.use(express.json());
  app.use('/api', router);
  app.use('/images', express.static(__dirname + '/images'));
  
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

runServer();
