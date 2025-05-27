import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import './globals.css'

export const metadata = {
  title: 'Leave Management System',
  description: 'A modern leave management system',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}