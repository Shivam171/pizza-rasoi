'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const handleFormSubmit = async (ev) => {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn('credentials', { email, password, callbackUrl: '/' });
    setLoginInProgress(false);
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>
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
          disabled={loginInProgress}
        />
        <input
          type="password"
          placeholder='password'
          onChange={ev => setPassword(ev.target.value)}
          disabled={loginInProgress}
        />
        <button type="submit" disabled={loginInProgress}>Login</button>
        <div className="my-4 text-center text-gray-500">or login with provider</div>
        <button type="button" onClick={() => { signIn('google', { callbackUrl: '/' }) }} className="flex items-center gap-4 justify-center">
          <Image src={'/google.png'} alt={'Login with Google'} width={32} height={32} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4"> New User ? <Link className="underline" href={"/register"}>Register here &raquo;</Link></div>
      </form>
    </section>
  )
}
