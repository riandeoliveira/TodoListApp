import { User as UserType } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUserSchema, authUserSchema } from '../validations/user-schema';

interface UserResponse {
  name: string;
  email: string;
  password: string;
}

class UserController {
  // Faz a autenticação de um usuário (login).
  authenticate = async (request: Request, response: Response) => {
    const user: Omit<UserResponse, 'name'> = request.body;

    try {
      const isValidUser: boolean = await authUserSchema.isValid(user);

      if (!isValidUser) {
        return response.status(500).json({
          name: 'Invalid data',
          code: 500,
          message: 'Dados inválidos! Por favor, tente novamente.',
        });
      }

      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      const hash = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          password: true,
        },
      });

      const isValidPassword: boolean = await bcrypt.compare(
        user.password,
        hash?.password as string
      );

      if (!userAlreadyExists || !isValidPassword) {
        return response.status(401).json({
          name: 'Error',
          code: 401,
          message: 'E-mail ou senha inválidos',
        });
      }

      const userData = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          todos: true,
        },
      });

      const secret = process.env.ACCESS_TOKEN_SECRET;

      const accessToken: string = jwt.sign(
        userData as Omit<UserType, 'password'>,
        secret as string
      );

      return response.status(200).json({ ...userData, accessToken });
    } catch (error: any) {
      return response.status(401).json({
        name: error.name,
        message: error.message,
        code: 401,
      });
    }
  };

  // Cria um novo usuário (cadastro).
  create = async (request: Request, response: Response) => {
    const user: UserResponse = request.body;

    try {
      const isValidUser: boolean = await createUserSchema.isValid(user);

      if (!isValidUser) {
        return response.status(500).json({
          name: 'Invalid data',
          code: 500,
          message: 'Dados inválidos! Por favor, tente novamente.',
        });
      }

      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (userAlreadyExists) {
        return response.status(500).json({
          name: 'User already exists',
          code: 500,
          message: 'Este e-mail já está em uso! Por favor, utilize outro.',
        });
      }

      const salt: string = await bcrypt.genSalt(10);
      const passwordHash: string = await bcrypt.hash(user.password, salt);

      await prisma.user.create({
        data: {
          name: user.name.trim(),
          email: user.email.trim(),
          password: passwordHash.trim(),
        },
      });

      const userData = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          todos: true,
        },
      });

      const secret = process.env.ACCESS_TOKEN_SECRET;
      const accessToken: string = jwt.sign(
        userData as Omit<UserType, 'password'>,
        secret as string
      );

      return response.status(201).json({ ...userData, accessToken });
    } catch (error: any) {
      return response.status(500).json({
        name: error.name,
        code: 500,
        message: error.message,
      });
    }
  };

  // Remove do sistema um usuário e suas tarefas.
  delete = async (_request: Request, response: Response) => {
    const userId: string = response.locals.user.id;

    try {
      await prisma.todo.deleteMany({
        where: {
          userId,
        },
      });

      await prisma.user.delete({
        where: {
          id: userId,
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

  // Retorna os dados de um usuário específico.
  get = async (_request: Request, response: Response) => {
    const userId: string = response.locals.user.id;

    console.log(response.locals);

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          todos: true,
        },
      });

      return response.status(200).json(user);
    } catch (error: any) {
      return response.status(500).json({
        name: error.name,
        code: 500,
        message: error.message,
      });
    }
  };
}

export const user: UserController = new UserController();
