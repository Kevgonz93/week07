import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import {
  type RockSong,
  type RockSongCreateDto,
} from '../entities/rockSongs/rocksong.js';
import { type AppRepo } from './app.repo.js';
import { HttpError } from '../middleware/errors.middleware.js';

const debug = createDebug('W07:rocksongs:repository:sql');

const select = {
  id: true,
  name: true,
  artist: true,
  album: true,
};

export class RockSongsSqlRepo implements AppRepo<RockSong, RockSongCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated rocksongs SQL repo');
  }

  async readAll() {
    return this.prisma.rockSong.findMany({
      distinct: ['createdAt', 'updatedAt'],
    });
  }

  async readById(id: string) {
    const rockSong = await this.prisma.rockSong.findUnique({
      where: { id },
      select,
    });

    if (!rockSong) {
      throw new HttpError(404, 'Not Found', `The Rock Song ${id} not found`);
    }

    return rockSong;
  }

  async create(data: RockSongCreateDto) {
    return this.prisma.rockSong.create({
      data: {
        album: data.album ?? '',
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<RockSongCreateDto>) {
    const rockSong = await this.prisma.rockSong.findUnique({
      where: { id },
      select,
    });

    if (!rockSong) {
      throw new HttpError(404, 'Not Found', `The Rock Song ${id} not found`);
    }

    return this.prisma.rockSong.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const rockSong = await this.prisma.rockSong.findUnique({
      where: { id },
      select,
    });

    if (!rockSong) {
      throw new HttpError(404, 'Not Found', `The Rock Song ${id} not found`);
    }

    return this.prisma.rockSong.delete({
      where: { id },
      select,
    });
  }
}
