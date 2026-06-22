import { JsonDB } from '../services/db.service';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Утилиты JsonDB', () => {
  it('должен возвращать пустой массив при ошибке чтения файла', async () => {
    (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));
    
    const data = await JsonDB.read('dummy_file');
    expect(data).toEqual([]); // Проверяем, что вернулся пустой массив
  });

  it('должен возвращать распарсенные данные', async () => {
    const mockData = '[{"id": 1, "name": "Test"}]';
    (fs.readFile as jest.Mock).mockResolvedValue(mockData);
    
    const data = await JsonDB.read('dummy_file');
    expect(data).toEqual([{ id: 1, name: "Test" }]);
  });
});