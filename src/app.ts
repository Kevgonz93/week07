import cors from 'cors';
import createDebug from 'debug';
import express, { type Express } from 'express';
import morgan from 'morgan';
import { RockSongsRouter } from './routes/rocksongs.routes.js';
import { RockSongsController } from './controllers/rocksongs.controllers.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { ClubsController } from './controllers/clubs.controllers.js';
import { ClubsSqlRepo } from './repositories/clubs.sql.repo.js';
import { ClubsRouter } from './routes/clubs.routes.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { RockSongsSqlRepo } from './repositories/rocksongs.sql.repo.js';
import { UsersController } from './controllers/users.controllers.js';
import { UsersRouter } from './routes/users.routes.js';
import { CountriesSqlRepo } from './repositories/countries.repo.sql.js';
import { CountriesController } from './controllers/countries.controllers.js';
import { CountriesRouter } from './routes/countries.routes.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';

const debug = createDebug('W07:APP');

export const createApp = () => {
  debug('Starting app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Creating app');

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const authInterceptor = new AuthInterceptor();

  const clubsRepo = new ClubsSqlRepo(prisma);
  const clubsController = new ClubsController(clubsRepo);
  const clubsRouter = new ClubsRouter(clubsController, authInterceptor);
  app.use('/clubs', clubsRouter.router);

  const rockSongsRepo = new RockSongsSqlRepo(prisma);
  const rockSongController = new RockSongsController(rockSongsRepo);
  const rockSongsRouter = new RockSongsRouter(
    rockSongController,
    authInterceptor
  );
  app.use('/rocksongs', rockSongsRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(usersController, authInterceptor);
  app.use('/users', usersRouter.router);

  const countriesRepo = new CountriesSqlRepo(prisma);
  const countriesController = new CountriesController(countriesRepo);
  const countriesRouter = new CountriesRouter(
    countriesController,
    authInterceptor
  );
  app.use('/countries', countriesRouter.router);

  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
