'use client';

import { ClientSignOut } from "@/components/ClientSignOut"
import { User } from "next-auth"
import { useSession } from "next-auth/react"

interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
}

interface DashboardHeaderProps {
  user: SessionUser
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const { data: session, status } = useSession();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          </div>
          <div className="flex items-center gap-x-4">
            {status === 'loading' ? (
              <div className="text-sm text-gray-600">Loading...</div>
            ) : (
              <div className="text-sm text-gray-600">
                <span className="font-medium">
                  {(session?.user as SessionUser)?.firstName} {(session?.user as SessionUser)?.lastName}
                </span>
                <span className="ml-2 text-gray-500">
                  ({(session?.user as SessionUser)?.role})
                </span>
              </div>
            )}
            <ClientSignOut />
          </div>
        </div>
      </div>
    </header>
  )
} 