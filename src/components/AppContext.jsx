'use client';
import { SessionProvider } from 'next-auth/react';

export default function AppProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
