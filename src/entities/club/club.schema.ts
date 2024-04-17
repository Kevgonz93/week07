import Joi from 'joi';
import { type ClubCreateDto } from './club.js';

export const clubCreateDtoSchema = Joi.object<ClubCreateDto>({
  name: Joi.string().required(),
  country: Joi.string().required(),
});

export const clubUpdateDtoSchema = Joi.object<ClubCreateDto>({
  name: Joi.string(),
  country: Joi.string(),
});
