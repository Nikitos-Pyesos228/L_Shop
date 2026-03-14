import { Request, Response } from 'express';
import { JsonDB } from '../services/db.service';
import { v4 as uuidv4 } from 'uuid'; // если нет uuid, можно просто Date.now().toString()

export const register = async (req: Request, res: Response) => {
  try {
    const { name, login, email, phone, password } = req.body;
    const users = await JsonDB.read<any>('users');

    // Проверяем, нет ли уже такого логина
    if (users.find((u: any) => u.login === login)) {
      return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      login,
      email,
      phone,
      password // В учебном проекте храним в открытом виде, как в ТЗ
    };

    users.push(newUser);
    await JsonDB.write('users', users);

    res.status(201).json({ message: 'Регистрация успешна' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;
    const users = await JsonDB.read<any>('users');

    const user = users.find((u: any) => u.login === login && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    // КРИТИЧНО ПО ТЗ: ставим куку на 10 минут (600 000 миллисекунд)
    res.cookie('session_id', user.id, {
      httpOnly: true, // Защита: кука не видна через JS (document.cookie)
      maxAge: 600000, 
      sameSite: 'lax'
    });

    res.json({ 
      message: 'Вход выполнен', 
      user: { id: user.id, login: user.login, name: user.name } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('session_id');
  res.json({ message: 'Выход выполнен' });
};