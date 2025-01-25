import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';

const userModel = new UserModel();

export async function collection(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userModel.collection(req.query.role as string);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}
