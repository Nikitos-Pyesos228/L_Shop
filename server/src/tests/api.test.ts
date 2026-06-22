import request from 'supertest';
import app from '../server';

describe('Интеграционные API Тесты', () => {
  
  it('GET /api/locale/detect -> должен вернуть Беларусь по умолчанию', async () => {
    const res = await request(app).get('/api/locale/detect');
    expect(res.statusCode).toBe(200);
    expect(res.body.country).toBe('Беларуси');
  });

  it('POST /api/admin/products -> должен запретить доступ без сессии Хозяина', async () => {
    const res = await request(app).post('/api/admin/products').send({
      title: 'Whiskey Test',
      price: 100
    });
    // 403 Forbidden, потому что запрос идет без сессионной куки 'host'
    expect(res.statusCode).toBe(403); 
  });

});