import 'next-auth'
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      department: string
      role: string
    } & DefaultSession["user"];
  }

  interface User {
    id: string
    email: string
    name?: string | null
    department: string
    role: string
  }

  interface AdapterUser {
    id: string
    email: string
    name?: string | null
    department: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    department: string;
    role: string;
  }
} 