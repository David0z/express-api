import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user';

const userModel = new UserModel();

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    await userModel.create(req.body);
    res.status(201).end();
  } catch (error) {
    next(error);
  }
}
