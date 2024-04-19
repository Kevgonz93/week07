/* eslint-disable max-nested-callbacks */
import { type Response, type Request } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { Auth } from '../services/auth.services';
import { error } from 'console';
import { HttpError } from './errors.middleware';

describe('Given a instance of the class AuthInterceptor', () => {
  const interceptor = new AuthInterceptor();
  Auth.verifyJwt = jest.fn().mockReturnValue({ id: '123' });
  test('Then it shoul be instance of the class', () => {
    expect(interceptor).toBeInstanceOf(AuthInterceptor);
  });

  describe('When we use the method authentication', () => {
    const req = {
      body: {},
      get: jest.fn().mockReturnValue('Bearer token'),
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
      expect(next).toHaveBeenCalled();
    });

    // Only ayuda a sólo realizar ese test
    describe.only('When token is not valid', () => {
      test('Then it shouldnt call next with error', () => {
        req.get = jest.fn().mockReturnValue('myToken');
        Auth.verifyJwt = jest.fn().mockImplementation(() => {
          throw new HttpError(498, 'Token Expired/Invalid', 'Token Invalid');
        });

        interceptor.authentication(req, res, next);
        expect(Auth.verifyJwt).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(
          new HttpError(498, 'Token Expired/Invalid', 'Token Invalid')
        );
      });
    });

    // Skip  ayuda a omitir el test
    describe.skip('When token is MALFORMED', () => {
      test('Then it should call for next error', () => {
        Auth.verifyJwt = jest.fn().mockImplementation(() => {
          throw new HttpError(498, 'Token Expired/Invalid', 'Token Invalid');
        });

        interceptor.authentication(req, res, next);
        expect(Auth.verifyJwt).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(
          new HttpError(498, 'Token Expired/Invalid', 'Token Invalid')
        );
      });
    });
  });
});
