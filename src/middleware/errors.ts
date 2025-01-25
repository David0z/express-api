import { NextFunction, Request, Response } from 'express';
import Error from '../interfaces/errors';

function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong :/';
  res.status(status).json({
    status,
    message,
  });
}

export default errorMiddleware;
