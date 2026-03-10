import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database');

export const JsonDB = {
  async read<T>(file: string): Promise<T[]> {
    try {
      const data = await fs.readFile(path.join(DB_PATH, `${file}.json`), 'utf-8');
      return JSON.parse(data);
    } catch { return []; }
  },
  async write<T>(file: string, data: T[]): Promise<void> {
    await fs.writeFile(path.join(DB_PATH, `${file}.json`), JSON.stringify(data, null, 2));
  }
};
