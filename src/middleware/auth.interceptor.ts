import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type AppPayload, Auth } from '../services/auth.services.js';
const debug = createDebug('W07:errors:middleware');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  authentication(req: Request, res: Response, next: NextFunction) {
    const data = req.get('Authorization');

    const error = new HttpError(498, 'Token Expired/Invalid', 'Token Invalid');

    if (!data?.startsWith('Bearer ')) {
      next(error);
      return;
    }

    const token = data.slice(7);

    try {
      const payload = Auth.verifyJwt(token);
      res.json({
        message: 'You are logged in',
        payload,
      });
    } catch (error) {
      next(error);
    }
  }

  autorization(req: Request, res: Response, next: NextFunction) {
    const { payload } = req.body as { payload: AppPayload };
    const { id } = req.params;
    if (payload.id !== id) {
      throw new HttpError(
        404,
        'Not Found',
        `Email/name and password are required`
      );
    }

    next();
  }
}
