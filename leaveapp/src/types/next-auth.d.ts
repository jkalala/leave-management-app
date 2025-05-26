import 'next-auth'
import { DefaultSession } from "next-auth";

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      department: string
    } & DefaultSession["user"];
  }

  interface User {
    id: string
    email: string
    name?: string | null
    department: string
    firstName: string
    lastName: string
    role: "EMPLOYEE" | "SUPERVISOR" | "HR" | "ADMIN"
    leaveBalance: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    department: string;
  }
} 