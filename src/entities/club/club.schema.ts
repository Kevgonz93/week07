import Joi from 'joi';
import { type ClubCreateDto } from './club.js';

export const clubCreateDtoSchema = Joi.object<ClubCreateDto>({
  name: Joi.string().required(),
  countryId: Joi.string().required(),
});

export const clubUpdateDtoSchema = Joi.object<ClubCreateDto>({
  name: Joi.string(),
  countryId: Joi.string(),
});
