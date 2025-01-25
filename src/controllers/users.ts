import { Request, Response } from 'express';

export function getUsers(req: Request, res: Response) {
  res.json({
    message: 'Hello world from users',
  });
}
