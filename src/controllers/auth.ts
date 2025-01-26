import { NextFunction, Request, Response } from 'express';
import AuthModel from '../models/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const authModel = new AuthModel();

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    const user = await authModel.getAuthUser(email);

    if (!user?.email) {
      res.status(400).json({ message: 'User does not exist' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;

    const existingUser = await authModel.getAuthUser(email);
    if (existingUser?.email) {
      res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await authModel.createAuthUser({
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      secretKey,
      { expiresIn: '1h' },
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    next(error);
  }
}
