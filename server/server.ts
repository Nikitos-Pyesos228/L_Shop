import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// ВАЖНО: добавили .js к db
import { db } from './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body;
  const users = await db.read('users');
  if (users.find((u: any) => u.email === email)) return res.status(400).json({message: 'User exists'});
  const newUser = { id: Date.now().toString(), email, password, name };
  users.push(newUser);
  await db.write('users', users);
  res.status(201).json({message: 'OK'});
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const users = await db.read('users');
  const user = users.find((u: any) => u.email === email && u.password === password);
  if (!user) return res.status(401).json({message: 'Fail'});

  res.cookie('auth_session', user.id, {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    sameSite: 'lax'
  });
  res.json({ name: user.name });
});

app.get('/api/auth/me', async (req, res) => {
  const userId = req.cookies.auth_session;
  if (!userId) return res.status(401).send();
  const users = await db.read('users');
  const user = users.find((u: any) => u.id === userId);
  res.json({ name: user?.name });
});

app.listen(5000, () => console.log('Server started on http://localhost:5000'));
