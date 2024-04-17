import { type Country } from '../country/country.js';

export type Club = {
  id: string;
  name: string;
  country: Partial<Country>;
};

export type ClubCreateDto = {
  name: string;
  countryId: string;
};
