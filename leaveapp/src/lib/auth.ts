import { PrismaClient, Prisma } from "@prisma/client"
import { compare } from "bcryptjs"
import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const prisma = new PrismaClient()

type UserWithBalance = Prisma.UserGetPayload<{
  select: {
    id: true
    email: true
    password: true
    firstName: true
    lastName: true
    department: true
    role: true
    leaveBalance: true
  }
}>

type UserSession = {
  id: string
  email: string
  firstName: string
  lastName: string
  department: string
  role: 'EMPLOYEE' | 'SUPERVISOR' | 'HR' | 'ADMIN'
  leaveBalance: number
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            password: true,
            firstName: true,
            lastName: true,
            department: true,
            role: true,
            leaveBalance: true,
          } as unknown as Prisma.UserSelect
        }) as UserWithBalance | null

        if (!user || !user.password || !user.email || !user.department) {
          throw new Error("Invalid credentials")
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error("Invalid credentials")
        }

        return {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          department: user.department,
          role: user.role,
          leaveBalance: user.leaveBalance,
        } as UserSession & { leaveBalance: number }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          department: user.department,
          role: user.role,
          leaveBalance: user.leaveBalance,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          department: token.department,
          role: token.role,
          leaveBalance: token.leaveBalance,
        },
      }
    },
  },
} 