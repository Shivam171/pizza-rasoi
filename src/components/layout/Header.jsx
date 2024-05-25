'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session.status;

  return (
    <header className="flex item-center justify-between">
      <nav className="flex gap-8 items-center text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">PIZZA RASOI</Link>
        <Link href={''}>Home</Link>
        <Link href={''}>Menu</Link>
        <Link href={''}>About</Link>
        <Link href={''}>Contact</Link>
      </nav>
      <nav className="flex gap-4 items-center text-gray-500 font-semibold">
        {status === 'authenticated' && (
          <button
            onClick={() => {
              signOut()
            }}
            className="bg-primary text-white px-8 py-2 rounded-full">Logout</button>
        )}
        {status !== 'authenticated' && (
          <>
            <Link href={'/login'}>Login</Link>
            <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}