import { User as UserType } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../types/user';
import { UserService } from '../services/UserService';

class UserController extends UserService {
  // Faz a autenticação de um usuário (login).
  authenticate = async (req: Request, res: Response) => {
    const { email, password }: User.Auth = req.body;

    try {
      const areInvalidFields: boolean = !email.trim() || !password.trim();

      // SELECT * FROM users WHERE email = 'email'
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // SELECT password FROM users WHERE email = 'email'
      const hash = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          password: true,
        },
      });

      const isValidPassword: boolean = await bcrypt.compare(
        password,
        hash?.password as string
      );

      if (areInvalidFields) {
        return res.status(401).json({
          name: 'Error',
          message: 'Campos inválidos! Por favor tente novamente.',
          code: 401,
        });
      }

      if (!userAlreadyExists || isValidPassword === false) {
        return res.status(401).json({
          name: 'Error',
          message: 'E-mail ou senha inválidos',
          code: 401,
        });
      }

      const secret = process.env.ACCESS_TOKEN_SECRET;

      // SELECT id, name, email FROM users WHERE email = 'email'
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      const accessToken: string = jwt.sign(user as UserType, secret as string);

      return res.status(200).json({ ...user, accessToken });
    } catch (error: any) {
      return res.status(401).json({
        name: error.name,
        message: error.message,
        code: 401,
      });
    }
  };

  // Cria um novo usuário (cadastro).
  create = async (req: Request, res: Response) => {
    const { name, email, password }: User.Create = req.body;

    try {
      const areInvalidFields: boolean =
        !name.trim() || !email.trim() || !password.trim();

      // SELECT * FROM users WHERE email = 'email'
      const userAlreadyExists = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (areInvalidFields) {
        return res.status(500).json({
          name: 'Error',
          message: 'Campos inválidos! Por favor, tente novamente.',
          code: 500,
        });
      }

      if (userAlreadyExists) {
        return res.status(500).json({
          name: 'Error',
          message: 'Este e-mail já está em uso! Por favor, utilize outro.',
          code: 500,
        });
      }

      const salt: string = await bcrypt.genSalt(10);
      const passwordHash: string = await bcrypt.hash(password, salt);

      // INSERT INTO users VALUES (name, email, password)
      await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          password: passwordHash.trim(),
        },
      });

      const secret = process.env.ACCESS_TOKEN_SECRET;

      // SELECT * FROM users WHERE email = 'email'
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      const accessToken: string = jwt.sign(user as UserType, secret as string);

      return res.status(201).json({ ...user, accessToken });
    } catch (error: any) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
        code: 500,
      });
    }
  };

  // Remove do sistema um usuário e suas tarefas.
  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      // DELETE FROM todos WHERE user_id = 'id'
      await prisma.todo.deleteMany({
        where: {
          userId: id,
        },
      });

      // DELETE FROM users WHERE id = 'id'
      await prisma.user.delete({
        where: {
          id,
        },
      });

      return res.status(204).send();
    } catch (error: any) {
      return res.status(409).json({
        name: error.name,
        message: error.message,
        code: 409,
      });
    }
  };

  // Pega um usuário específico de acordo com o token de acesso enviado no cabeçalho da requisição.
  get = async (_req: Request, res: Response) => {
    const id: string = res.locals.user.id; // recebe o usuário decodificado do middleware

    try {
      // SELECT id, name, email FROM users WHERE id = 'id'
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(404).json({
        name: error.name,
        message: error.message,
        code: 404,
      });
    }
  };
}

export const user: UserController = new UserController();
