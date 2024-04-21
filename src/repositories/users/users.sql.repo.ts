import createDebug from 'debug';
import { type PrismaClient } from '@prisma/client';
import { HttpError } from '../../middleware/errors.middleware.js';
import { type WithLoginRepo, type AppRepo } from '../app/app.repo.js';
import { type User, type UserCreateDto } from '../../entities/user/user.js';

const debug = createDebug('W07:users:repository:sql');

const select = {
  id: true,
  name: true,
  lastname: true,
  email: true,
  role: true,
  birthDate: true,
  club: {
    select: {
      id: true,
      name: true,
      country: {
        select: {
          name: true,
          continent: true,
        },
      },
    },
  },
};

export class UsersSqlRepo implements WithLoginRepo<User, UserCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated Users SQL repository');
  }

  async readAll() {
    return this.prisma.user.findMany({
      select,
    });
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

  async find(key: string, value: undefined) {
    return this.prisma.user.findMany({
      where: {
        [key]: value,
      },
      select,
    });
  }

  async searchForLogin(key: 'email' | 'name', value: string) {
    if (!['email', 'name'].includes(key)) {
      throw new HttpError(404, 'Not Found', `Invalid query parameters`);
    }

    const userData = await this.prisma.user.findFirst({
      where: {
        [key]: value,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        role: true,
        password: true,
      },
    });

    if (!userData) {
      throw new HttpError(404, 'Not Found', `Invalid ${key}or password`);
    }

    return userData;
  }

  async create(data: UserCreateDto) {
    const { birthDateString, ...rest } = data;
    const newUser = this.prisma.user.create({
      data: {
        role: 'user',
        birthDate: new Date(birthDateString),
        ...rest,
      },
      select,
    });
    return newUser;
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
