import { Router } from 'express';
import * as controllers from '../../controllers/users';

const routes = Router();

routes.get('/', controllers.collection);

export default routes;
