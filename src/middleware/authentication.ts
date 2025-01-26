import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';

const secretKey = config.jwtSecret as string;

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearer = req.header('Authorization')?.split(' ')[0].toLowerCase();
  const token = req.header('Authorization')?.split(' ')[1];

  if (bearer !== 'bearer') {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }

  if (!token) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded) {
      next();
    } else {
      res.status(401).json({ message: 'Invalid or expired token.' });
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
