import createDebug from 'debug';
import { type User, type UserCreateDto } from '../entities/user/user.js';
import { type AppRepo } from '../repositories/app.repo.js';
import { AppController } from './app.controllers.js';
import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../entities/user/user.schema.js';

const debug = createDebug('W07:users:controller');

export class UsersController extends AppController<User, UserCreateDto> {
  constructor(protected readonly repo: AppRepo<User, UserCreateDto>) {
    super(repo, userCreateDtoSchema, userUpdateDtoSchema);
    debug('Instantieated users controller');
  }
}
