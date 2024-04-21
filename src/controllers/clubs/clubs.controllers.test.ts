import { type Request, type Response } from 'express';
import { type ClubsSqlRepo } from '../../repositories/clubs/clubs.sql.repo';
import { ClubsController } from './clubs.controllers';

describe('Given a instance of the class ArticlesController', () => {
  const repo = {
    create: jest.fn(),
    // Previous readAll: jest.fn(),
    // readById: jest.fn(),
    // update: jest.fn(),
    // delete: jest.fn(),
  } as unknown as ClubsSqlRepo;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new ClubsController(repo);
  test('Then it should be instanciated', () => {
    expect(controller).toBeInstanceOf(ClubsController);
  });

  describe('When we use the method create', () => {
    test('Then it should call repo.create', async () => {
      const club = { name: 'Manchester City', country: 'England' };
      const validateClub = {
        ...club,
        name: 'Manchester City',
        country: 'England',
      };
      req.body = { ...club, payload: { id: 'test' } };
      (repo.create as jest.Mock).mockResolvedValue(club);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(validateClub);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(club);
    });
  });
});
