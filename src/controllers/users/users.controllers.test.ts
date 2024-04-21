import { type Request, type Response } from 'express';
import { type ObjectSchema } from 'joi';
import { type UserCreateDto } from '../../entities/user/user';
import { type UsersSqlRepo } from '../../repositories/users/users.sql.repo';
import { Auth } from '../../services/auth.services';
import { UsersController } from './users.controllers';

jest.mock('', () => ({
  userCreateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<UserCreateDto>,
  userUpdateDtoSchema: {
    validate: jest.fn().mockReturnValue({ error: null, value: {} }),
  } as unknown as ObjectSchema<UserCreateDto>,
}));

describe('Given a instance of the class UsersController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    searchForLogin: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UsersSqlRepo;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  Auth.hash = jest.fn().mockResolvedValue('hashedPassword');

  const controller = new UsersController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(UsersController);
  });

  describe('When we use the method login', () => {
    test('Then it should call searchForLogin method', async () => {
      const user = { id: '1', password: 'password' };
      req.body = { email: 'test@acme.com', password: 'password' };
      (repo.searchForLogin as jest.Mock).mockResolvedValue(user);
      await controller.login(req, res, next);
      expect(repo.searchForLogin).toHaveBeenCalledWith(
        'email',
        'test@acme.com'
      );
    });
  });

  describe('When we use the method create', () => {
    test('Then it should call repo.create', async () => {
      const user = { name: 'test', password: 'test' };
      req.body = user;
      (repo.create as jest.Mock).mockResolvedValue(user);
      await controller.create(req, res, next);
      expect(repo.create).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe('When we use the method update', () => {
    test('Then it should call repo.update', async () => {
      const user = { id: '1' };
      req.params = { id: '1' };
      req.body = { ...user, id: req.params.id };
      (repo.update as jest.Mock).mockResolvedValue(user);
      await controller.update(req, res, next);
      expect(repo.update).toHaveBeenCalledWith('1', user);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });
});
