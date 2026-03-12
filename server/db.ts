import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// В ESM режиме создаем __dirname сами
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = {
  async read(table: string) {
    const filePath = path.join(__dirname, `${table}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      // Если файла нет, возвращаем пустой массив
      return [];
    }
  },
  async write(table: string, data: any) {
    const filePath = path.join(__dirname, `${table}.json`);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }
};
