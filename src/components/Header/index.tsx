'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiLoader, FiLock, FiLogOut, FiUser } from 'react-icons/fi';

const Header = () => {
  const { status, data } = useSession();

  async function handleLogin() {
    await signIn();
  }

  async function handleLogout() {
    await signOut();
  }

  <div></div>;

  return (
    <header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="pl-1 text-2xl font-bold duration-300 hover:tracking-widest">
            <span className="text-blue-500">HELP</span> DESK
          </h1>
        </Link>

        {status === 'loading' && (
          <button className="animate-spin">
            <FiLoader size={26} color="#4b5563" />
          </button>
        )}

        {status === 'unauthenticated' && (
          <button onClick={handleLogin}>
            <FiLock size={26} color="#4b5563" />
          </button>
        )}

        {status === 'authenticated' && (
          <div className="flex items-baseline gap-4">
            <Link href="/dashboard">
              <FiUser size={26} color="#4b5563" />
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut size={26} color="#4b5563" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
