/* eslint-disable @typescript-eslint/member-ordering */
import createDebug from 'debug';
import { type RockSong, type RockSongCreateDto } from '../entities/rocksong.js';
import { readFile, writeFile } from 'fs/promises';

const debug = createDebug('W07:rocksongs:repository:fs');
export class RockSongsFsRepo {
  constructor() {
    debug('Instantiated articles fs repository');
  }

  private async load(): Promise<RockSong[]> {
    const data = await readFile('rockSongs.json', 'utf-8');
    return JSON.parse(data) as RockSong[];
  }

  private async save(rockSongs: RockSong[]) {
    await writeFile('rockSongs.json', JSON.stringify(rockSongs, null, 2));
  }

  async readAll() {
    const rockSongs = await this.load();
    return rockSongs;
  }

  async readById(id: string) {
    const rockSongs = await this.load();
    const rockSong = rockSongs.find((rockSong) => rockSong.id === id);

    if (!rockSong) {
      throw new Error();
    }

    return rockSong;
  }

  async create(data: RockSongCreateDto) {
    const newRockSong: RockSong = {
      id: crypto.randomUUID(),
      ...data,
    };
    let rockSongs = await this.load();
    rockSongs = [...rockSongs, newRockSong];
    await this.save(rockSongs);
    return newRockSong;
  }

  async update(id: string, data: Partial<RockSong>) {
    let rockSongs = await this.load();
    const rockSong = rockSongs.find((rockSong) => rockSong.id === id);
    if (!rockSong) {
      throw new Error();
    }

    const newRockSong: RockSong = { ...rockSong, ...data };
    rockSongs = rockSongs.map((rockSong) =>
      rockSong.id === id ? newRockSong : rockSong
    );

    await this.save(rockSongs);
    return newRockSong;
  }

  async delete(id: string) {
    let rockSongs = await this.load();
    const rockSong = rockSongs.find((rockSong) => rockSong.id === id);
    if (!rockSong) {
      throw new Error();
    }

    rockSongs = rockSongs.filter((rockSong) => rockSong.id !== id);
    await this.save(rockSongs);
    return rockSong;
  }
}
