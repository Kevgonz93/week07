/* eslint-disable @typescript-eslint/no-extraneous-class */
import { hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

// Importar para utilizar 'process' y leer el archivo ".env"
// Import '.dotenv/config'
// Vvv---En index.ts ya está importado---vvv

export type AppPayload = {
  id: string;
  role: string;
} & jwt.JwtPayload;

export class Auth {
  static secret = process.env.VAR_SECRET;

  static async hash(value: string) {
    return hash(value, 10);
  }

  static async compare(value: string, hash: string) {
    return compare(value, hash);
  }

  static signJwt(payload: jwt.JwtPayload) {
    if (!Auth.secret) throw new Error('JWT secret not set');
    return jwt.sign(payload, Auth.secret);
  }

  static verifyJwt(token: string) {
    if (!Auth.secret) throw new Error('JWT secret not set');
    return jwt.verify(token, Auth.secret);
  }
}
