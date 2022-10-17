import { Todo } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

class TodoController {
  all = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      const todos: Todo[] = await prisma.todo.findMany({
        where: {
          userId: id,
        },
      });

      res.status(200).json(todos);
    } catch (err: unknown) {
      console.error(err);

      res.status(404).json({ error: err });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;
    const todo: Pick<Todo, 'name'> = req.body;

    try {
      await prisma.todo.create({
        data: {
          name: todo.name,
          completed: false,
          userId: id,
        },
      });

      res.status(201).json({ message: 'Tarefa criada com sucesso!' });
    } catch (err: unknown) {
      console.log(err);

      res.status(500).json({ error: err });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    try {
      await prisma.todo.delete({
        where: {
          id,
        },
      });

      res.status(204).json({ message: 'Tarefa removida com sucesso!' });
    } catch (err: unknown) {
      console.log(err);

      res.status(409).json({ error: err });
    }
  };
}

export default new TodoController();
