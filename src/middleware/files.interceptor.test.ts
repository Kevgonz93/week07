import { type Request, type NextFunction, type Response } from 'express';
import { FilesInterceptor } from './files.interceptor';
import multer from 'multer';
import { v2 } from 'cloudinary';

jest.mock('multer');
jest.mock('Cloudinary');

// Const mockFilesInterception = {
//   singleFile: jest.fn(),
//   couldinaryUp: jest.fn(),
// };

describe('Given a instance of the class FilesInterceptor', () => {
  const interceptor = new FilesInterceptor();
  const req = {
    body: {},
  } as unknown as Request;
  const res = {} as unknown as Response;
  const next = {} as unknown as NextFunction;

  test('Then it shoul be instance of the class', () => {
    expect(interceptor).toBeInstanceOf(FilesInterceptor);
  });
  // Describe('When we use the method SigleFile', () => {
  //   const mockMiddleware = jest.fn();

  //   multer.diskStorage = jest
  //     .fn()
  //     .mockImplementation(({ fileName }) => filename('', '', () => {}))(
  //       multer as unknown as jest.Mock
  //     )
  //     .mockReturnValue({
  //       single: jest.fn().mockReturnValue(mockMiddleware),
  //     });
  //   test('Then it should...', () => {
  //     //
  //   });
  // });

  describe('When we use the method Cloudinary', () => {
    v2.uploader = {
      upload: jest.fn().mockResolvedValue({}),
    } as unknown as typeof v2.uploader;

    test('Then it should...', async () => {
      await interceptor.couldinaryUp(req, res, next);
      expect(v2.uploader.upload).toHaveBeenCalled();
    });
  });
});
