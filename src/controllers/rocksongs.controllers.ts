import createDebug from 'debug';
import { type RockSongsFsRepo } from '../repositories/rocksongs.fs.repo.js';
import { type Request, type Response, type NextFunction } from 'express';
import { type RockSong, type RockSongCreateDto } from '../entities/rocksong.js';
import {
  rockSongCreateDtoSchema,
  rockSongUpdateDtoSchema,
} from '../entities/rocksong.schema.js';
import { HttpError } from '../middleware/rocksongs.middleware.js';

const debug = createDebug('W07:articles:controller');

export class RockSongsController {
  constructor(private readonly repo: RockSongsFsRepo) {
    debug('Instantiated rockSong controller');
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.repo.readAll();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.readById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body as RockSong;

    const {
      error,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      value,
    }: { error: Error | undefined; value: RockSongCreateDto } =
      rockSongCreateDtoSchema.validate(data, {
        abortEarly: false,
      });
    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.create(value);
      res.status(200);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body as RockSong;

    const { error } = rockSongUpdateDtoSchema.validate(data, {
      abortEarly: false,
    });

    if (error) {
      next(new HttpError(406, 'Not Acceptable', error.message));
      return;
    }

    try {
      const result = await this.repo.update(id, data);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const result = await this.repo.delete(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}
