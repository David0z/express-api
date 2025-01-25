import { Router } from 'express';
import * as controllers from '../../controllers/user';

const routes = Router();

routes.post('/', controllers.create);
routes.get('/:userId', controllers.get);
routes.patch('/:userId', controllers.update);
routes.delete('/:userId', controllers.remove);

export default routes;
