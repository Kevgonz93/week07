import Joi from 'joi';
import { type RockSongCreateDto } from './rocksong.js';

export const rockSongCreateDtoSchema = Joi.object<RockSongCreateDto>({
  name: Joi.string().required,
  artist: Joi.string().required,
  album: Joi.string().default('Not Specifed'),
  year: Joi.number().default('Not Specifed'),
});

export const rockSongUpdateDtoSchema = Joi.object<RockSongCreateDto>({
  name: Joi.string(),
  artist: Joi.string(),
  album: Joi.string(),
  year: Joi.number,
});
