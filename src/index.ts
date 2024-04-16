import createDebug from 'debug';
import { createServer } from 'http';
import 'dotenv/config';
import { createApp } from './app.js';

const debug = createDebug('W07:server');
debug('Starting server');

const port = process.env.PORT ?? 2000;
const server = createServer(createApp());

server.listen(port);

server.on('error', (error) => {
  debug('Error', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server is running on http://localhots:${port}`);
});
