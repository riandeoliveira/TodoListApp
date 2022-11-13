import { Router } from 'express';
import { todo } from '../controllers/TodoController';
import { user } from '../controllers/UserController';
import { authToken } from '../middlewares/authToken';

export const routes: Router = Router();

// Rotas de usuário
routes.post('/auth/signin', user.authenticate);
routes.post('/auth/signup', user.create);
routes.delete('/user', authToken, user.delete);

// Rotas de tarefas
routes.put('/todo/:id', authToken, todo.complete);
routes.post('/todo', authToken, todo.create);
routes.delete('/todo/:id', authToken, todo.delete);
