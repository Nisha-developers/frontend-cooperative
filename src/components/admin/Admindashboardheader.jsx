import React from 'react';
import { CiBellOn, CiMenuBurger } from "react-icons/ci";

const Admindashboardheader = ({ mobileMenuOpen, setMobileMenuOpen,  componentUserValue, iscollapse }) => {
  const walletValue = componentUserValue.wallet;
  const userValue = componentUserValue.user;
 
 
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 md:px-6 py-4 gap-4">
      {/* Left section with mobile menu button */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#003000] hover:bg-[#FDF6EC] rounded-lg transition-colors"
        >
          <CiMenuBurger size={24} />
        </button>

        <div className='text-[#003000] font-bold text-3xl'>Bethel</div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* Notification */}
        <button className="relative p-2 text-[#003000] hover:bg-[#FDF6EC] rounded-xl transition-all duration-300 group">
          <CiBellOn size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#F57C00] rounded-full animate-pulse" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-3 p-2 hover:bg-[#FDF6EC] rounded-xl transition-all duration-300 group">
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#2E7D32] flex items-center justify-center text-[#FDF6EC] font-bold text-lg">
              {
  userValue.full_name
    ?.split(' ')
    .map(name => name[0]?.toUpperCase())
    .join('')
}
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#F57C00] rounded-full border-2 border-white" />
          </div>
          
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-[#003000]">{userValue.full_name}</p>
            <p className="text-xs text-[#2E7D32]">{userValue.email}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Admindashboardheader;