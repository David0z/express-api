import { Router } from 'express';
import userRoutes from './api/user.routes';
import usersRoutes from './api/users.routes';
import authRoutes from './api/auth.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/users', usersRoutes);
routes.use('/auth', authRoutes);

export default routes;
