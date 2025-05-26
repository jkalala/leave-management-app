import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: 'employee@test.com',
      firstName: 'Test',
      lastName: 'Employee',
      password: await hash('password123', 12),
      role: 'EMPLOYEE',
      department: 'Engineering'
    },
    {
      email: 'supervisor@test.com',
      firstName: 'Test',
      lastName: 'Supervisor',
      password: await hash('password123', 12),
      role: 'SUPERVISOR',
      department: 'Engineering'
    },
    {
      email: 'director@test.com',
      firstName: 'Test',
      lastName: 'Director',
      password: await hash('password123', 12),
      role: 'ADMIN',
      department: 'Engineering'
    },
    {
      email: 'hr@test.com',
      firstName: 'Test',
      lastName: 'HR',
      password: await hash('password123', 12),
      role: 'HR',
      department: 'Human Resources'
    }
  ];

  for (const user of users) {
    try {
      await prisma.user.create({
        data: user
      });
      console.log(`Created user: ${user.email}`);
    } catch (error) {
      console.error(`Error creating user ${user.email}:`, error);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()); 