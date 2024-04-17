import { type Club } from '../club/club.js';

export type Country = {
  id: string;
  name: string;
  continent: string;
};

export type CountryCreateDto = {
  name: string;
  continent: string;
};

export type CountryUpdateDto = Partial<CountryCreateDto>;
