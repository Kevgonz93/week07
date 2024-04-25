import { type Club } from '../club/club.js';

export type User = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
  birthDate: Date;
  avatar: string;
  role: 'admin' | 'user' | 'guest';
  // eslint-disable-next-line @typescript-eslint/array-type
  club: Partial<Club>[];
};

export type UserCreateDto = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  birthDateString: string;
  avatar: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
