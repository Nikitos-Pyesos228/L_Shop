import axios from 'axios';

/**
 * Инстанс Axios для взаимодействия с API сервера.
 * Настроен с базовым URL и поддержкой передачи куки (credentials).
 */
export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

/**
 * Добавляем интерцептор (перехватчик) для обработки ошибок или логгирования, 
 * что также считается утилитарной логикой.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Ошибка API запроса:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);