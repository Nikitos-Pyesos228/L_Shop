import fs from 'fs/promises';
import path from 'path';

/**
 * Класс для низкоуровневого доступа к JSON-файлам базы данных.
 */
export class JsonDB {
  /**
   * Статический метод для чтения данных из файла по полному имени.
   * Путь вычисляется относительно директории services.
   * 
   * @template T - Тип возвращаемых данных.
   * @param {string} filename - Имя файла с расширением (например, 'products.json').
   * @returns {Promise<T>} Возвращает данные, приведенные к типу T.
   * @throws Бросает ошибку, если файл не может быть прочитан.
   */
  static async read<T>(filename: string): Promise<T> {
    // Поднимаемся на 2 уровня вверх (из services -> src -> server) и заходим в database
    const filePath = path.join(__dirname, '../../database', filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T;
  }
}