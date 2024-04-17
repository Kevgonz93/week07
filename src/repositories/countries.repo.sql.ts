import createDebug from 'debug';
import { type PrismaClient } from '@prisma/client';
import { type AppRepo } from './app.repo.js';
import {
  type Country,
  type CountryCreateDto,
} from '../entities/country/country.js';
import { HttpError } from '../middleware/errors.middleware.js';

const debug = createDebug('W07:countries:repository:sql');

const select = {
  id: true,
  name: true,
  continent: true,
  clubs: {
    select: {
      id: true,
      name: true,
    },
  },
};

export class CountriesSqlRepo implements AppRepo<Country, CountryCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated Countries SQL repository');
  }

  async readAll() {
    return this.prisma.country.findMany({ select });
  }

  async readById(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      select,
    });

    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return country;
  }

  async create(data: CountryCreateDto) {
    return this.prisma.country.create({
      data,
      select,
    });
  }

  async update(id: string, data: Partial<CountryCreateDto>) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      select,
    });

    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return this.prisma.country.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const country = await this.prisma.country.findUnique({
      where: { id },
      select,
    });

    if (!country) {
      throw new HttpError(404, 'Not Found', `Country ${id} not found`);
    }

    return this.prisma.country.delete({
      where: { id },
      select,
    });
  }
}
