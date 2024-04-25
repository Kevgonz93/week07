import Joi from 'joi';
import { type UserCreateDto } from './user.js';

export const userCreateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  birthDateString: Joi.string().required(),
  avatar: Joi.string(),
});

export const userUpdateDtoSchema = Joi.object<UserCreateDto>({
  name: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  birthDateString: Joi.string(),
  avatar: Joi.string(),
});
