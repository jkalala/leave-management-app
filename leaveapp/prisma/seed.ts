const { PrismaClient, UserRole } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create test users with different roles
  const users = [
    {
      email: 'employee@test.com',
      name: 'Test Employee',
      password: await hash('password123', 12),
      role: UserRole.EMPLOYEE,
      department: 'Engineering'
    },
    {
      email: 'supervisor@test.com',
      name: 'Test Supervisor',
      password: await hash('password123', 12),
      role: UserRole.SUPERVISOR,
      department: 'Engineering'
    },
    {
      email: 'director@test.com',
      name: 'Test Director',
      password: await hash('password123', 12),
      role: UserRole.DIRECTOR,
      department: 'Engineering'
    },
    {
      email: 'hr@test.com',
      name: 'Test HR',
      password: await hash('password123', 12),
      role: UserRole.HR,
      department: 'Human Resources'
    }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user
    });
  }

  console.log('Test users created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 