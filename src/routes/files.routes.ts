import { Router as createRouter } from 'express';
import { type FilesController } from '../controllers/files.controllers.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

export class FilesRouter {
  router = createRouter();

  constructor(
    readonly controller: FilesController,
    readonly interceptor: FilesInterceptor
  ) {
    this.router.post(
      '/',
      interceptor.sigleFile('avatar').bind(interceptor),
      interceptor.couldinaryUp.bind(interceptor),
      controller.fileHander.bind(controller)
    );
  }
}
