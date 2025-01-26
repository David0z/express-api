import { Router } from 'express';
import * as controllers from '../../controllers/users';
import { authenticateJWT } from '../../middleware/authentication';

const routes = Router();

routes.get('/', authenticateJWT, controllers.collection);

export default routes;
