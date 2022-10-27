import { prisma } from '../libs/prisma';

// TODO: Descobrir como lidar com diferentes tipos de retornos de dados em cada um dos métodos.

export abstract class UserService {
  protected async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  protected async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
