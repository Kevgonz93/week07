import { type Request, type Response } from 'express';
import multer, { type Multer } from 'multer';

export class FilesController {
  up: Multer;
  constructor() {
    this.up = multer();
  }

  fileHander(req: Request, res: Response) {
    this.up.single('file');
    res.send('File uploaded');
    // OTRA OPCIÓN:
    // res.json({message:'File uploaded'})
  }
}
