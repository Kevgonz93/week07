import createDebug from 'debug';
import { type PrismaClient } from '@prisma/client';
import { HttpError } from '../middleware/errors.middleware.js';
import { type AppRepo } from './app.repo.js';
import { type User, type UserCreateDto } from '../entities/user/user.js';

const debug = createDebug('W07:users:repository:sql');

const select = {
  id: true,
  name: true,
  lastname: true,
  email: true,
};

export class UsersSqlRepo implements AppRepo<User, UserCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated Users SQL repository');
  }

  async readAll() {
    const user = await this.prisma.user.findMany({
      distinct: ['createdAt', 'updatedAt'],
    });
    return user;
  }

  async readById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return user;
  }

  async create(data: UserCreateDto) {
    return this.prisma.user.create({
      data: {
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<UserCreateDto>) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select,
    });

    if (!user) {
      throw new HttpError(404, 'Not Found', `User ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
      select,
    });
  }
}
