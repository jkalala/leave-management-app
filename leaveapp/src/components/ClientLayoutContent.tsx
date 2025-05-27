'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { Session } from 'next-auth';
import Header from './Header';

const queryClient = new QueryClient();

interface ClientLayoutContentProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientLayoutContent({ children, session }: ClientLayoutContentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header session={session} />
      {children}
    </QueryClientProvider>
  );
} 