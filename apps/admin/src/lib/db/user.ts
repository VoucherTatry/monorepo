import { User } from '@prisma/client';

export function createUser(user: User) {
  return prisma.user.create({
    data: user,
  });
}

export function deleteUser(id: User['id']) {
  return prisma.user.delete({ where: { id } });
}

export const getAllUsers = prisma.user.findMany();
