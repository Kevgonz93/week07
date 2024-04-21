import { type Request, type Response } from 'express';
import { type CountriesSqlRepo } from '../../repositories/countries/countries.repo.sql';
import { CountriesController } from './countries.controllers';

describe('Given a instance of the class CountriesController', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as CountriesSqlRepo;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new CountriesController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(CountriesController);
  });
  describe('When we use the method create', () => {
    test('Then it should call repo.create', async () => {
      const country = { name: 'England', continent: 'Europe' };
      const validateCountry = {
        ...country,
        name: 'England',
        continent: 'Europe',
      };
      req.body = { ...country, payload: { id: 'test' } };
      (repo.create as jest.Mock).mockResolvedValue(country);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(validateCountry);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(country);
    });
  });
});
