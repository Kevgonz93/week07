import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ClubsController } from '../controllers/clubs.controllers.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W07:clubs:router');

export class ClubsRouter {
  router = createRouter();

  constructor(
    readonly controller: ClubsController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated clubs router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
