import { Router } from 'express';
import * as controllers from '../../controllers/user';
import { authenticateJWT } from '../../middleware/authentication';

const routes = Router();

routes.post('/', authenticateJWT, controllers.create);
routes.get('/:userId', authenticateJWT, controllers.get);
routes.patch('/:userId', authenticateJWT, controllers.update);
routes.delete('/:userId', authenticateJWT, controllers.remove);

export default routes;
