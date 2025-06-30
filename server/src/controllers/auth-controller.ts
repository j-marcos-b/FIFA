import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user-model';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const register = async (req: Request, res: Response) => {
  console.log('Register request body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Register missing email or password');
    return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('Register user already exists:', email);
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    console.log('User registered:', newUser.id);
    return res.status(201).json({ msg: 'Usuario registrado correctamente', userId: newUser.id });
  } catch (error) {
    console.error('Error en register:', error);
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('Login request body:', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Login missing email or password');
    return res.status(400).json({ msg: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Login user not found:', email);
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login incorrect password for user:', email);
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Login successful for user:', email);
    return res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ msg: 'Error en el servidor', error });
  }
};
