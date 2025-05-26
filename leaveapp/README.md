# Leave Application System

A modern leave management system built with Next.js, Clerk, and PostgreSQL.

## Features

- Employee Leave Request
  - Digital form with mandatory fields
  - Smart suggestions and validations
  - File attachments support
- Approval Workflow
  - Multi-level approval process
  - Automated notifications
  - Conditional logic for approvals
- Leave Calendar
  - Team leave visibility
  - Conflict prevention
  - Department-wise views
- Employee Self-Service
  - Leave balance tracking
  - Request history
  - Status updates
- Manager Dashboard
  - Bulk approvals
  - Team analytics
  - Leave trends

## Tech Stack

- **Frontend & Backend**: Next.js 14
- **Authentication**: Clerk
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Date Handling**: date-fns
- **UI Components**: Custom components with Radix UI

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Clerk account for authentication

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd leaveapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/leaveapp?schema=public"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Next Auth
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
leaveapp/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── api/            # API routes
│   │   ├── leave/          # Leave management pages
│   │   └── ...
│   ├── components/         # React components
│   │   ├── leave/         # Leave-related components
│   │   └── ui/            # UI components
│   └── lib/               # Utility functions
├── prisma/                # Database schema and migrations
├── public/               # Static assets
└── ...
```

## Development

- Run tests: `npm test`
- Build for production: `npm run build`
- Start production server: `npm start`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
