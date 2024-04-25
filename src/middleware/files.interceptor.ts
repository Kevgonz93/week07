import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import multer from 'multer';

const debug = createDebug('W7E:files:interceptor');

export class FilesInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  // Función que almacena en local los 'files'
  sigleFile(fieldName = 'avatar') {
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
    const middleware = upload.single(fieldName);

    return (req: Request, res: Response, next: NextFunction) => {
      const previosBoy = req.body as Record<string, unknown>;
      middleware(req, res, next);
      req.body = { ...previosBoy, ...req.body } as unknown;
    };
  }
}
