import { Request, Response, Router } from 'express';
import { getUsers } from '../../controllers/users';

const routes = Router();

routes.get('/', getUsers);

export default routes;
