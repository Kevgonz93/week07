import Joi from 'joi';
import { type UserCreateDto } from './user.js';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().required(),
});

export const userUpdateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string(),
});