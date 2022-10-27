import { Todo } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

class TodoController {
  all = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      const todos: Todo[] = await prisma.todo.findMany({
        where: {
          userId: id,
        },
      });

      return res.status(200).json(todos);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  };

  create = async (req: Request, res: Response) => {
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

      return res.status(201).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      await prisma.todo.delete({
        where: {
          id,
        },
      });

      return res.status(204).send();
    } catch (error: any) {
      return res.status(409).json({ error: error.message });
    }
  };
}

export const todo: TodoController = new TodoController();
