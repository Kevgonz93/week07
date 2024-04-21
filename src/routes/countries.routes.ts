import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type CountriesController } from '../controllers/countries/countries.controllers.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';

const debug = createDebug('W07:countries:router');

export class CountriesRouter {
  router = createRouter();

  constructor(
    readonly controller: CountriesController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated countries router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
