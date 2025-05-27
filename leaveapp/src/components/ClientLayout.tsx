import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from 'react';
import ClientLayoutContent from './ClientLayoutContent';

interface ClientLayoutProps {
  children: ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <ClientLayoutContent session={session}>
        {children}
      </ClientLayoutContent>
    </SessionProvider>
  );
} 