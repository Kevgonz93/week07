import { type Country } from '../country/country.js';
import { type User } from '../user/user.js';

export type Club = {
  id: string;
  name: string;
  country: Partial<Country>;
  fans: Partial<User>;
};

export type ClubCreateDto = {
  name: string;
  countryId: string;
  fanId: string;
};
