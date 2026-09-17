import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-dark-bg border-t border-[rgba(255,255,255,0.05)] py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white tracking-widest">
            <span className="text-neon-cyan">K</span>A<span className="text-neon-purple">M</span>ESH.
          </span>
        </div>

        <p className="text-gray-400 text-sm md:text-base text-center flex items-center gap-1">
          Designed & Built with <Heart size={16} className="text-neon-purple mx-1 fill-neon-purple" /> by Kamesh
        </p>

        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
