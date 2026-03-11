import fs from 'fs/promises';
import path from 'path';

export class JsonDB {
  static async read<T>(filename: string): Promise<T> {
    // Поднимаемся на 2 уровня вверх (из services -> src -> server) и заходим в database
    const filePath = path.join(__dirname, '../../database', filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  }
}