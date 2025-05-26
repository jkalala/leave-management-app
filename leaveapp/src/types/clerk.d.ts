declare module '@clerk/nextjs' {
  export const authMiddleware: any;
  export const auth: () => Promise<{ userId: string | null }>;
  export const currentUser: () => Promise<{ id: string } | null>;
  export const SignIn: React.ComponentType<any>;
  export const SignUp: React.ComponentType<any>;
  export const ClerkProvider: React.ComponentType<{ children: React.ReactNode }>;
}

declare module '@clerk/nextjs/server' {
  export const auth: () => Promise<{ userId: string | null }>;
  export const authMiddleware: any;
}

declare module '@clerk/nextjs/edge' {
  export const authMiddleware: any;
} 