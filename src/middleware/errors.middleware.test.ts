import { type Request, type Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { Auth } from '../services/auth.services';
import { HttpError } from './errors.middleware';

describe('Given a instance of the class AuthInterceptor', () => {
  const interceptor = new AuthInterceptor();
  Auth.verifyJwt = jest.fn().mockReturnValue({ id: '123' });

  test('Then it should be instance of the class', () => {
    expect(interceptor).toBeInstanceOf(AuthInterceptor);
  });
  describe('When we use the method authentication', () => {
    const req = {
      body: {},
      get: jest.fn().mockReturnValue('Bearer myToken'),
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    test('Then it should call next without parameters', () => {
      interceptor.authentication(req, res, next);
      expect(Auth.verifyJwt).toHaveBeenCalled();
      expect(req.body.payload).toEqual({ id: '123' });
      expect(next).toHaveBeenCalledWith();
    });

    describe('When we use the method authentication and token is MALFORMED', () => {
      test('Then it should call next with error', () => {
        req.get = jest.fn().mockReturnValue('myToken');
        interceptor.authentication(req, res, next);
        expect(next).toHaveBeenLastCalledWith(
          new HttpError(498, ' Token expired/invalid', 'Token invalid')
        );
      });
    });
    describe('When we use the method authentication and token is INVALIDO', () => {
      test('Then it should call next with error', () => {
        req.get = jest.fn().mockReturnValue('Bearer myToken');
        // eslint-disable-next-line max-nested-callbacks
        Auth.verifyJwt = jest.fn().mockImplementation(() => {
          throw new Error('Invalid token');
        });
        interceptor.authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(new Error('Token invalid'));
      });
    });
  });
});
