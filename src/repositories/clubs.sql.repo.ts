import createDebug from 'debug';
import { type PrismaClient } from '@prisma/client';
import { type Club, type ClubCreateDto } from '../entities/club/club.js';
import { HttpError } from '../middleware/errors.middleware.js';
import { type AppRepo } from './app.repo.js';

const debug = createDebug('W07:club:repository:sql');

const select = {
  id: true,
  name: true,
  country: {
    select: {
      name: true,
      continent: true,
    },
  },
};

export class ClubsSqlRepo implements AppRepo<Club, ClubCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated Clubs SQL repository');
  }

  async readAll() {
    const club = this.prisma.club.findMany({ select });
    return club;
  }

  async readById(id: string) {
    const club = await this.prisma.club.findUnique({
      where: { id },
      select,
    });

    if (!club) {
      throw new HttpError(404, 'Not Found', `The Club ${id} not found`);
    }

    return club;
  }

  async create(data: ClubCreateDto) {
    return this.prisma.club.create({
      data,
      select,
    });
  }

  async update(id: string, data: Partial<ClubCreateDto>) {
    const club = await this.prisma.club.findUnique({
      where: { id },
      select,
    });

    if (!club) {
      throw new HttpError(404, 'Not Found', `Club ${id} not found`);
    }

    return this.prisma.club.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const club = await this.prisma.club.findUnique({
      where: { id },
      select,
    });

    if (!club) {
      throw new HttpError(404, 'Not Found', `Club ${id} not found`);
    }

    return this.prisma.club.delete({
      where: { id },
      select,
    });
  }
}
