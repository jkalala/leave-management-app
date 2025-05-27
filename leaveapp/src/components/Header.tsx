'use client'

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { signOut } from 'next-auth/react'
import type { Session } from 'next-auth'

interface HeaderProps {
  session: Session | null
}

export default function Header({ session }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Leave Management System
        </Typography>
        <Box>
          {session ? (
            <>
              <Typography component="span" sx={{ mr: 2 }}>
                {session.user?.email}
              </Typography>
              <Button color="inherit" onClick={() => signOut()}>
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" href="/api/auth/signin">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
} 