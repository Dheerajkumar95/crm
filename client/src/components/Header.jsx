import React from 'react';
import { FaBars } from 'react-icons/fa';

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between sticky top-0 z-20 h-16">
      <button
        onClick={() => setSidebarOpen(prev => !prev)}
        className="text-[#01080d] focus:outline-none cursor-pointer hover:text-[#1e2b34] transition duration-200"
      >
        <FaBars size={20} />
      </button>

      <h1 className="text-xl font-bold text-[#060000]">SalesTruff</h1>

      <div className="text-sm text-gray-500">Settings</div>
    </header>
  );
};

export default Header;
