import { Router as createRouter } from 'express';
import { type FilesController } from '../controllers/files.controllers';
import { type FilesInterceptor } from '../middleware/files.interceptor';

export class FilesRouter {
  router = createRouter();

  constructor(
    readonly controller: FilesController,
    readonly interceptor: FilesInterceptor
  ) {
    this.router.post(
      '/',
      interceptor.sigleFile('avatar').bind(interceptor),
      controller.fileHander.bind(controller)
    );
  }
}
