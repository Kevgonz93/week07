import {
  Router as createRouter,
  type NextFunction,
  type Response,
  type Request,
} from 'express';
import createDebug from 'debug';
import { type UsersController } from '../controllers/users/users.controllers.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor.js';
import { type FilesInterceptor } from '../middleware/files.interceptor.js';

const debug = createDebug('W07:users:router');

export class UsersRouter {
  router = createRouter();

  constructor(
    readonly controller: UsersController,
    readonly authInterceptor: AuthInterceptor,
    readonly filesInterceptor: FilesInterceptor
  ) {
    debug('Instantiated users router');

    this.router.post(
      '/register',
      filesInterceptor.sigleFile('avatar'),
      controller.create.bind(controller)
    );
    this.router.post('/login', controller.login.bind(controller));

    this.router.get(
      '/login',
      authInterceptor.authentication.bind(authInterceptor),
      this.checkLogin.bind(controller)
    );

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));

    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }

  checkLogin(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: 'You are logged',
    });
  }
}
