import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';
import bcrypt from 'bcrypt';

class UserController {
  all = async (_req: Request, res: Response) => {
    try {
      const users: User[] = await prisma.user.findMany();

      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(404).json({
        name: error.name,
        message: error.message,
        code: 404,
      });
    }
  };

  auth = (req: Request, res: Response) => {};

  create = async (req: Request, res: Response) => {
    const { name, email, password }: Omit<User, 'id'> = req.body;

    try {
      const invalidFields: boolean =
        !name.trim() || !email.trim() || !password.trim();

      const userAlreadyExists: User | null = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (invalidFields)
        return res.status(500).json({
          name: 'Error',
          message: 'Campos inválidos! Por favor tente novamente.',
          code: 500,
        });

      if (userAlreadyExists)
        return res.status(500).json({
          name: 'Error',
          message: 'E-mail já cadastrado! Por favor, utilize outro.',
          code: 500,
        });

      const salt: string = await bcrypt.genSalt(10);
      const passwordHash: string = await bcrypt.hash(password, salt);

      await prisma.user.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          password: passwordHash.trim(),
        },
      });

      return res.status(201).send();
    } catch (error: any) {
      return res.status(500).json({
        name: error.name,
        message: error.message,
        code: 500,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
      await prisma.todo.deleteMany({
        where: {
          userId: id,
        },
      });

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
}

export const user: UserController = new UserController();
