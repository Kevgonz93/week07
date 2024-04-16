import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type RockSongsController } from '../controllers/rocksongs.controllers.js';

const debug = createDebug('W07:rockSongs:routers');

export class RockSongsRouter {
  router = createRouter();

  constructor(private readonly controller: RockSongsController) {
    debug('Instantiated rockSong router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post('/', controller.create.bind(controller));
    this.router.patch('/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
