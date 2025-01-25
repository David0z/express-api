import { Router } from 'express';
import userRoutes from './api/user.routes';
import usersRoutes from './api/users.routes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/users', usersRoutes);

export default routes;
