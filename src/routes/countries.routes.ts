import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type CountriesController } from '../controllers/countries.controllers.js';

const debug = createDebug('W07:countries:router');

export class CountriesRouter {
  router = createRouter();

  constructor(private readonly controller: CountriesController) {
    debug('Instantiated countries router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
