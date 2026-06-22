import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database');

/**
 * Сервис для работы с JSON-базой данных.
 * Обеспечивает чтение и запись массивов данных в файлы.
 */
export const JsonDB = {
  /**
   * Читает данные из указанного JSON-файла.
   * 
   * @template T - Тип элементов массива.
   * @param {string} file - Название файла (без расширения .json).
   * @returns {Promise<T[]>} Возвращает массив объектов типа T. Если файл пуст или не найден, возвращает [].
   */
  async read<T>(file: string): Promise<T[]> {
    try {
      const data = await fs.readFile(path.join(DB_PATH, `${file}.json`), 'utf-8');
      return JSON.parse(data);
    } catch { return []; }
  },

  /**
   * Записывает массив данных в указанный JSON-файл.
   * 
   * @template T - Тип элементов массива.
   * @param {string} file - Название файла (без расширения .json).
   * @param {T[]} data - Массив данных для сохранения.
   * @returns {Promise<void>}
   */
  async write<T>(file: string, data: T[]): Promise<void> {
    await fs.writeFile(path.join(DB_PATH, `${file}.json`), JSON.stringify(data, null, 2));
  }
};