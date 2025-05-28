import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '@/lib/theme';
import Header from './Header';

const queryClient = new QueryClient();

interface ClientLayoutProps {
  children: ReactNode;
}

export default async function ClientLayout({ children }: ClientLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header session={session} />
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
} 