/* eslint-disable @typescript-eslint/naming-convention */
import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import multer from 'multer';
import { v2 } from 'cloudinary';
import { HttpError } from './errors.middleware.js';

const debug = createDebug('W7E:files:interceptor');

export class FilesInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  // Función que almacena en local los 'files'
  sigleFile(fileName = 'avatar') {
    const storage = multer.diskStorage({
      // Aplicamos opciones al almacenamiento local
      destination: 'uploads/',
      filename(_req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
      },
    });

    // Aplicamos la función multer al  storage seleccionado
    const upload = multer({ storage });
    // Aplicamos un middleware al aplicar el muter
    const middleware = upload.single(fileName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previosBoy = req.body as Record<string, unknown>;
      middleware(req, res, next);
      req.body = { ...previosBoy, ...req.body } as unknown;
    };
  }

  // Función que almacena en Cloudinary
  async couldinaryUp(req: Request, res: Response, next: NextFunction) {
    const options = {
      folder: '',
      use_filemane: true,
      unique_filename: false,
      overwrite: true,
    };
    if (!req.file) {
      next(new HttpError(400, 'Bad Request', 'No file uploaded'));
      return;
    }

    const finalPath = req.file.destination + '/' + req.file.filename;
    try {
      const result = await v2.uploader.upload(finalPath, { options });
      console.log(result);
      next();
    } catch (error) {
      next(
        new HttpError(500, 'Internal server error', (error as Error).message)
      );
    }
  }
}
