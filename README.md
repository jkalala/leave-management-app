# Leave Management App

A modern web application for managing employee leave requests, built with Next.js, TypeScript, and Prisma.

## Features

- User authentication and authorization
- Role-based access control (Employee, Supervisor, HR, Admin)
- Leave request submission and approval workflow
- Leave balance tracking
- Calendar view of leave requests
- File attachments for leave requests
- Real-time notifications

## Tech Stack

- Next.js 14
- TypeScript
- Prisma (PostgreSQL)
- NextAuth.js
- Tailwind CSS
- Material-UI
- React Hook Form
- Zod

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up the database:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/leaveapp"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## License

MIT 