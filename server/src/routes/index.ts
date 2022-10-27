import { Router } from 'express';
import { todo } from '../controllers/TodoController';
import { user } from '../controllers/UserController';
import { authToken } from '../middlewares/authToken';

export const routes: Router = Router();

routes.delete('/users/:id', authToken, user.delete);
routes.delete('/users/:id/todos', authToken, todo.delete);
routes.get('/user', authToken, user.get);
routes.get('/users/:id/todos', authToken, todo.all);
routes.post('/auth/signin', user.authenticate);
routes.post('/auth/signup', user.create);
routes.post('/users/:id/todos', authToken, todo.create);
