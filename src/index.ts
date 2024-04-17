import createDebug from 'debug';
import { createServer } from 'http';
import 'dotenv/config';
import { createApp, startApp } from './app.js';
import { dbConnect } from './tools/db.connect.js';

const debug = createDebug('W07:server');
debug('Starting server');

const port = process.env.PORT ?? 2000;
const app = createApp();
const server = createServer(app);

dbConnect()
  .then((prisma) => {
    startApp(app, prisma);
    server.listen(port);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('error', (error) => {
  debug('Error', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server is running on http://localhost:${port}`);
});
