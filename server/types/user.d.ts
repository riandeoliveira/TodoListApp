import { User as UserType } from '@prisma/client';

export namespace User {
  type Auth = Omit<UserType, 'id' | 'name'>;
  type Create = Omit<UserType, 'id'>;
}
