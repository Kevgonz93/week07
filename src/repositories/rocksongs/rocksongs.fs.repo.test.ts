import { readFile } from 'fs';
import { HttpError } from '../../middleware/errors.middleware';
import { RockSongsFsRepo } from './rocksongs.fs.repo';

jest.mock('fs/promises');

describe('Given a instance of the class ArticlesFsRepo', () => {
  const repo = new RockSongsFsRepo();

  test('Then it should be instance of the class', () => {
    expect(repo).toBeInstanceOf(RockSongsFsRepo);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call readFile', async () => {
      (readFile as jest.Mock).mockResolvedValue('[]');
      const result = await repo.readAll();
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call readFile', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.readById('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method readById with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.readById('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });

  describe('When we use the method update with a valid ID', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue(
        '[{"id": "1"}, {"id": "2"}]'
      );
      const result = await repo.update('1', {});
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method update with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.update('2', {})).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });

  describe('When we use the method delete with a valid ID', () => {
    test('Then it should call readFile and writeFile', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      const result = await repo.delete('1');
      expect(readFile).toHaveBeenCalled();
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('When we use the method delete with an invalid ID', () => {
    test('Then it should throw an error', async () => {
      (readFile as unknown as jest.Mock).mockResolvedValue('[{"id": "1"}]');
      await expect(repo.delete('2')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'Article 2 not found')
      );
    });
  });
});
