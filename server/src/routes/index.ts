import { Router } from 'express';
import userController from '../controllers/UserController';
import todoController from '../controllers/TodoController';

export const routes: Router = Router();

routes.get('/users', userController.all);
routes.post('/users', userController.create);
routes.delete('/users/:id', userController.delete);

routes.get('/users/:id/todos', todoController.all);
routes.post('/users/:id/todos', todoController.create);
routes.delete('/users/:id/todos', todoController.delete);
