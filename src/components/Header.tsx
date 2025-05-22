import React from 'react';
import { LockKeyhole } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-indigo-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <LockKeyhole className="h-8 w-8 text-purple-300" />
          <h1 className="text-2xl font-bold">
            Lock<span className="text-purple-300">N</span>code
          </h1>
        </div>
        <div className="text-sm md:text-base opacity-75">
          Secure Encryption Tool
        </div>
      </div>
    </header>
  );
};

export default Header;