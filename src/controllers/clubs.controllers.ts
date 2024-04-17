import createDebug from 'debug';
import { type Club, type ClubCreateDto } from '../entities/club/club.js';
import {
  clubCreateDtoSchema,
  clubUpdateDtoSchema,
} from '../entities/club/club.schema.js';
import { AppController } from './app.controllers.js';
import { type AppRepo } from '../repositories/app.repo.js';

const debug = createDebug('W07:clubs:controller');

export class ClubsController extends AppController<Club, ClubCreateDto> {
  constructor(protected readonly repo: AppRepo<Club, ClubCreateDto>) {
    super(repo, clubCreateDtoSchema, clubUpdateDtoSchema);
    debug('Instantiated clubs controller');
  }
}
