import 'next-auth'
import { DefaultSession } from "next-auth";
import { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      department: string
      role: UserRole
    } & DefaultSession["user"];
  }

  interface User {
    id: string
    email: string
    name?: string | null
    department: string
    role: UserRole
  }

  interface AdapterUser {
    id: string
    email: string
    name?: string | null
    department: string
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    department: string;
    role: UserRole;
  }
} 