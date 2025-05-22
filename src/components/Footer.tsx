import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-center md:text-left">
        <div className="flex items-center space-x-2 mb-2 md:mb-0">
          <Shield className="h-5 w-5 text-purple-300" />
          <p className="text-sm">
            LockNcode &copy; {new Date().getFullYear()}
          </p>
        </div>
        <div className="text-xs text-gray-400">
          <p>All encryption is performed locally in your browser. Your data never leaves your device.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;