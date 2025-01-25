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

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userModel.get(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    await userModel.update(req.body, req.params.userId);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await userModel.remove(req.params.userId);
    res.status(200).end();
  } catch (error) {
    next(error);
  }
}
