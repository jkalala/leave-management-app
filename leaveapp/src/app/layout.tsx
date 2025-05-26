import { type Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LeaveApp - Modern Leave Management System',
  description: 'Efficiently manage employee leave requests, approvals, and tracking',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  )
}