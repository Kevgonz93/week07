import createDebug from 'debug';
import {
  type Country,
  type CountryCreateDto,
} from '../../entities/country/country.js';
import { AppController } from '../app/app.controllers.js';
import { type AppRepo } from '../../repositories/app/app.repo.js';
import {
  countryCreateDtoSchema,
  countryUpdateDtoSchema,
} from '../../entities/country/country.schema.js';

const debug = createDebug('W07:contries:controller');

export class CountriesController extends AppController<
  Country,
  CountryCreateDto
> {
  constructor(protected readonly repo: AppRepo<Country, CountryCreateDto>) {
    super(repo, countryCreateDtoSchema, countryUpdateDtoSchema);
    debug('Instantieated contries controller');
  }
}
