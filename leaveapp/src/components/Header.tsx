'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      {!session ? (
        <>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
          <Link
            href="/sign-up"
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Sign Up
          </Link>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            {session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  )
} 