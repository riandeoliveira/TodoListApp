import { Todo as TodoType } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import { createTodoSchema } from '../validations/todo-schema';

interface TodoResponse {
  name: string;
}

class TodoController {
  complete = async (request: Request, response: Response) => {
    const todoId: string = request.params.id;
    const userId: string = response.locals.user.id;

    try {
      const [isTodoOwner] = await prisma.todo.findMany({
        where: {
          id: todoId,
          userId,
        },
      });

      if (!isTodoOwner) {
        return response.status(500).json({
          name: 'Error',
          code: 500,
          message: 'Não foi possível atualizar a tarefa.',
        });
      }

      const todo = await prisma.todo.findUnique({
        where: {
          id: todoId,
        },
        select: {
          completed: true,
        },
      });

      await prisma.todo.update({
        where: {
          id: todoId,
        },
        data: {
          completed: !todo?.completed,
        },
      });

      return response.status(204).send();
    } catch (error: any) {
      return response.status(405).json({
        name: error.name,
        code: 405,
        message: error.message,
      });
    }
  };

  create = async (request: Request, response: Response) => {
    const todo: TodoResponse = request.body;
    const userId: string = response.locals.user.id;

    try {
      const isValidTodo: boolean = await createTodoSchema.isValid(todo);

      const todoAlreadyExists = await prisma.todo.findUnique({
        where: {
          name: todo.name,
        },
      });

      if (!isValidTodo || todoAlreadyExists) {
        return response.status(500).json({
          name: 'Invalid data',
          code: 500,
          message: 'Dados inválidos! Por favor, tente novamente.',
        });
      }

      await prisma.todo.create({
        data: {
          name: todo.name.trim(),
          completed: false,
          userId,
        },
      });

      return response.status(201).send();
    } catch (error: any) {
      return response.status(500).json({
        name: error.name,
        code: 500,
        message: error.message,
      });
    }
  };

  delete = async (request: Request, response: Response) => {
    const todoId: string = request.params.id;
    const userId: string = response.locals.user.id;

    try {
      const [isTodoOwner] = await prisma.todo.findMany({
        where: {
          id: todoId,
          userId,
        },
      });

      if (!isTodoOwner) {
        return response.status(500).json({
          name: 'Error',
          code: 500,
          message: 'Não foi possível remover a tarefa.',
        });
      }

      await prisma.todo.delete({
        where: {
          id: todoId,
        },
      });

      return response.status(204).send();
    } catch (error: any) {
      return response.status(409).json({
        name: error.name,
        code: 409,
        message: error.message,
      });
    }
  };
}

export const todo: TodoController = new TodoController();
