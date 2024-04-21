import { type Request, type Response } from 'express';
import { type RockSongsSqlRepo } from '../../repositories/rocksongs/rocksongs.sql.repo';
import { RockSongsController } from './rocksongs.controllers';

describe('Given a instance of the class CountriesController', () => {
  const repo = {
    create: jest.fn(),
  } as unknown as RockSongsSqlRepo;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new RockSongsController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(RockSongsController);
  });
  describe('When we use the method create', () => {
    test('Then it should call create', async () => {
      const rockSong = { name: 'name', continent: 'continent' };
      const validateRockSong = { ...rockSong, name: '', artist: '' };
      req.body = { ...rockSong, payload: { id: 'test' } };
      (repo.create as jest.Mock).mockResolvedValue(rockSong);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith(validateRockSong);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(rockSong);
    });
  });
});
