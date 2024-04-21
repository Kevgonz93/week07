import createDebug from 'debug';
import {
  type RockSong,
  type RockSongCreateDto,
} from '../../entities/rockSongs/rocksong.js';
import {
  rockSongCreateDtoSchema,
  rockSongUpdateDtoSchema,
} from '../../entities/rockSongs/rocksong.schema.js';
import { AppController } from '../app/app.controllers.js';
import { type AppRepo } from '../../repositories/app/app.repo.js';

const debug = createDebug('W07:rocksongs:controller');

export class RockSongsController extends AppController<
  RockSong,
  RockSongCreateDto
> {
  constructor(protected readonly repo: AppRepo<RockSong, RockSongCreateDto>) {
    super(repo, rockSongCreateDtoSchema, rockSongUpdateDtoSchema);
    debug('Instantiated rockSong controller');
  }
}
