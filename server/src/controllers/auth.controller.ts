import { Response } from 'express';
import { JsonDB } from '../services/db.service';

export const login = async (req: any, res: Response) => {
  try {
    const { login, password } = req.body;
    const users = await JsonDB.read<any>('users');
    const user = users.find((u: any) => u.login === login && u.password === password);

    if (!user) return res.status(401).json({ message: 'Ошибка' });

    // Записываем в сессию
    req.session.user = { id: user.id, login: user.login, role: user.role || 'user' };
    
    res.json({ message: 'OK', user: req.session.user });
  } catch (e) {
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

export const register = async (req: any, res: Response) => {
  const { login, password } = req.body;
  const users = await JsonDB.read<any>('users');
  const newUser = { id: Date.now().toString(), login, password, role: 'user' };
  users.push(newUser);
  await JsonDB.write('users', users);
  res.status(201).json({ message: 'OK' });
};

export const logout = (req: any, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Bye' });
  });
};