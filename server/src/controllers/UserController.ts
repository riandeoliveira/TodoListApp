import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { prisma } from '../libs/prisma';

class UserController {
  all = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users: User[] = await prisma.user.findMany();

      res.status(200).json(users);
    } catch (err: unknown) {
      console.error(err);

      res.status(404).json({ error: err });
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const user: Omit<User, 'id'> = req.body;

    try {
      await prisma.user.create({
        data: user,
      });

      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (err: unknown) {
      console.error(err);

      res.status(500).json({ error: err });
    }
  };
  delete = async (req: Request, res: Response): Promise<void> => {
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

      res.status(404).json({ message: 'Usuário removido com sucesso!' });
    } catch (err: unknown) {
      console.log(err);

      res.status(409).json({ error: err });
    }
  };
}

export default new UserController();
