'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      setError(true);
    } else {
      setUserCreated(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User Created <br /> Now you can <Link href="/login" className="text-green-500">Login &raquo;</Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An Error has occured. <br /> Please try again later ⏰
        </div>
      )}
      <form
        action=""
        onSubmit={handleFormSubmit}
        className="block max-w-xs mx-auto"
      >
        <input
          type="email"
          placeholder='email'
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder='password'
          onChange={ev => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>Register</button>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button type="button" onClick={() => { signIn('google', { callbackUrl: '/' }) }} className="flex items-center gap-4 justify-center">
          <Image src={'/google.png'} alt={'Login with Google'} width={32} height={32} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">Existing account ? <Link className="underline" href={"/login"}>Login here &raquo;</Link></div>
      </form>
    </section>

  )
}
