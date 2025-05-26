const { PrismaClient, Role } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create test users with different roles
  const users = [
    {
      email: 'employee@test.com',
      firstName: 'Test',
      lastName: 'Employee',
      password: await hash('password123', 12),
      role: Role.EMPLOYEE,
      department: 'Engineering',
      leaveBalance: 20
    },
    {
      email: 'supervisor@test.com',
      firstName: 'Test',
      lastName: 'Supervisor',
      password: await hash('password123', 12),
      role: Role.SUPERVISOR,
      department: 'Engineering',
      leaveBalance: 20
    },
    {
      email: 'hr@test.com',
      firstName: 'Test',
      lastName: 'HR',
      password: await hash('password123', 12),
      role: Role.HR,
      department: 'Human Resources',
      leaveBalance: 20
    },
    {
      email: 'admin@test.com',
      firstName: 'Test',
      lastName: 'Admin',
      password: await hash('password123', 12),
      role: Role.ADMIN,
      department: 'Administration',
      leaveBalance: 20
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