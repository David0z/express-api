import { Router } from 'express';
import * as controllers from '../../controllers/auth';
import { body } from 'express-validator';

const routes = Router();

routes.post('/login', controllers.login);
routes.post(
  '/register',
  [
    body('email')
      .isEmail()
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  controllers.register,
);

export default routes;
