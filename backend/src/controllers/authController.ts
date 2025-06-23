import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashed });
  const token = jwt.sign({ id: user.getDataValue('id') }, process.env.JWT_SECRET as string);
  res.json({ token });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, user.getDataValue('password'));
  if (!valid) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: user.getDataValue('id') }, process.env.JWT_SECRET as string);
  res.json({ token });
};
