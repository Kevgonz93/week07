import { type NextFunction, type Request, type Response } from 'express';
import multer, { type Multer } from 'multer';
import { HttpError } from '../middleware/errors.middleware.js';

export class FilesController {
  up: Multer;
  constructor() {
    this.up = multer();
  }

  fileHander(req: Request, res: Response, next: NextFunction) {
    if (!req.file) {
      next(new HttpError(400, 'Bad Request', 'no file uploaded'));
      return;
    }

    this.up.single('file');
    res.send('File uploaded');
    // OTRA OPCIÓN:
    // res.json({message:'File uploaded'})

    next();
  }
}
