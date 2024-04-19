import createDebug from 'debug';
import { type Club, type ClubCreateDto } from '../entities/club/club.js';
import {
  clubCreateDtoSchema,
  clubUpdateDtoSchema,
} from '../entities/club/club.schema.js';
import { AppController } from './app.controllers.js';
import { type AppRepo } from '../repositories/app.repo.js';
import { type Response, type NextFunction, type Request } from 'express';
import { type Payload } from '../services/auth.services.js';

const debug = createDebug('W07:clubs:controller');

export class ClubsController extends AppController<Club, ClubCreateDto> {
  constructor(protected readonly repo: AppRepo<Club, ClubCreateDto>) {
    super(repo, clubCreateDtoSchema, clubUpdateDtoSchema);
    debug('Instantiated clubs controller');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    debug('Creating Clubs');
    req.body.userId = (req.body.payload as Payload).id;

    const { payload, ...rest } = req.body as ClubCreateDto & {
      payload: Payload;
    };
    req.body = rest;

    await super.create(req, res, next);
  }
}
