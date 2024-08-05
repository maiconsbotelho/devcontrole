import Link from 'next/link';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="flex h-20 w-full items-center bg-white px-2 py-4 shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/">
          <h1 className="pl-1 text-2xl font-bold duration-300 hover:tracking-widest">
            <span className="text-blue-500">DEV</span> CONTROLE
          </h1>
        </Link>

        <div className="flex items-baseline gap-4">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>
          <button>
            <FiLogOut size={26} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
