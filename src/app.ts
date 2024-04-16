import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { RockSongsRouter } from './routes/rocksongs.routes.js';
import { RockSongsFsRepo } from './repositories/rocksongs.fs.repo.js';
import { RockSongsController } from './controllers/rocksongs.controllers.js';
import { ErrorsMiddleware } from './middleware/rocksongs.middleware.js';

const debug = createDebug('W07:APP');

export const createApp = () => {
  const app = express();
  debug('Starting app');

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const rockSongsRepo = new RockSongsFsRepo();
  const rockSongController = new RockSongsController(rockSongsRepo);
  const rockSongsRouter = new RockSongsRouter(rockSongController);
  app.use('/rocksongs', rockSongsRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));

  return app;
};
