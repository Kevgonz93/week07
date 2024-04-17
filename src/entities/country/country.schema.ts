import Joi from 'joi';
import { type CountryCreateDto } from './country.js';

export const countryCreateDtoSchema = Joi.object<CountryCreateDto>({
  name: Joi.string().required(),
  continent: Joi.string().required(),
});

export const countryUpdateDtoSchema = Joi.object<CountryCreateDto>({
  name: Joi.string(),
  continent: Joi.string(),
});
