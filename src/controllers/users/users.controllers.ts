import createDebug from 'debug';
import { type User, type UserCreateDto } from '../../entities/user/user.js';
import { type WithLoginRepo } from '../../repositories/app/app.repo.js';
import { AppController } from '../app/app.controllers.js';
import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../../entities/user/user.schema.js';
import { type Response, type NextFunction, type Request } from 'express';
import { HttpError } from '../../middleware/errors.middleware.js';
import { Auth } from '../../services/auth.services.js';

const debug = createDebug('W07:users:controller');

export class UsersController extends AppController<User, UserCreateDto> {
  constructor(protected readonly repo: WithLoginRepo<User, UserCreateDto>) {
    super(repo, userCreateDtoSchema, userUpdateDtoSchema);
    debug('Instantieated users controller');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body as UserCreateDto;

    if ((!email && !name) || !password) {
      next(
        new HttpError(404, 'Not Found', `Email/name and password are required`)
      );
      return;
    }

    const error = new HttpError(
      401,
      'Unauthorized',
      'Email/name and password invalid'
    );
    try {
      const user = await this.repo.searchForLogin(
        email ? 'email' : 'name',
        email || name
      );

      if (!user) {
        next(error);
        return;
      }

      if (!(await Auth.compare(password, user.password!))) {
        next(error);
        return;
      }

      if (user.password !== password) {
        next(error);
      }

      const token = Auth.signJwt({
        id: user.id!,
        role: user.role!,
      });

      res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    if (!req.body.password || typeof req.body.password !== 'string') {
      next(new HttpError(400, 'Bad request', 'Password is required'));
      return;
    }

    req.body.password = await Auth.hash(req.body.password as string);
    await super.create(req, res, next);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    if (!req.body.password && typeof req.body.password === 'string') {
      req.body.password = await Auth.hash(req.body.password as string);
      await super.update(req, res, next);
    }
  }
}
