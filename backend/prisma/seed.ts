import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.friendship.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding database...');

  const password = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      password,
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      password,
      name: 'Jane Smith',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password,
      name: 'Bob Johnson',
    },
  });

  console.log('Created users:', { user1, user2, user3 });

  const friendship1 = await prisma.friendship.create({
    data: {
      senderId: user1.id,
      receiverId: user2.id,
      status: 'ACCEPTED',
    },
  });

  const friendship2 = await prisma.friendship.create({
    data: {
      senderId: user3.id,
      receiverId: user1.id,
      status: 'PENDING',
    },
  });

  console.log('Created friendships:', { friendship1, friendship2 });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });