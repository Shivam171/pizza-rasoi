'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";
import Bars3 from "../icons/Bars3";
import ShoppingCart from "../icons/ShoppingCart";

export default function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  const { cartProducts } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  if (userName && userName.includes(' ')) {
    userName = userName.split(' ')[0];
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href="/">PIZZA RASOI</Link>
        {!isMobile && (
          <div className="flex gap-8 ml-8">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
          </div>
        )}
      </nav>
      <div className="flex items-center">
        <nav className="flex gap-4 items-center text-gray-500 font-semibold">
          {status === 'authenticated' && !isMobile && (
            <>
              <Link href={'/profile'} className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={signOut}
                className="bg-primary text-white px-8 py-2 rounded-full">Logout</button>
            </>
          )}
          {status !== 'authenticated' && !isMobile && (
            <>
              <Link href={'/login'}>Login</Link>
              <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full">Register</Link>
            </>
          )}
          <Link href={'/cart'} className="relative">
            <ShoppingCart />
            <span className="absolute -top-2 -right-4 bg-primary py-1 px-1 text-white text-xs rounded-full leading-3">{cartProducts.length}</span>
          </Link>

          {isMobile && (
            <button
              className="text-gray-500 border-none ml-4 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3 className="w-6 h-6" />
            </button>
          )}
        </nav>
      </div>
      {isMobile && isMenuOpen && (
        <div className="absolute top-16 right-4 bg-gray-100 shadow-lg rounded-lg p-4 z-50">
          <nav className="flex flex-col gap-4 text-gray-500 font-semibold">
            <Link href={'/'}>Home</Link>
            <Link href={'/menu'}>Menu</Link>
            <Link href={'/#about'}>About</Link>
            <Link href={'/#contact'}>Contact</Link>
            {status === 'authenticated' && (
              <>
                <Link href={'/profile'} className="whitespace-nowrap">
                  Hello, {userName}
                </Link>
                <button
                  onClick={signOut}
                  className="bg-primary text-white px-8 py-2 rounded-full">Logout</button>
              </>
            )}
            {status !== 'authenticated' && (
              <>
                <Link href={'/login'}>Login</Link>
                <Link href={'/register'} className="bg-primary text-white px-8 py-2 rounded-full">Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
