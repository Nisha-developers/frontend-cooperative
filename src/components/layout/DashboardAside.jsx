import React from 'react';
import { CiMenuBurger, CiLogout, CiCircleRemove} from "react-icons/ci";
import { FaNairaSign } from 'react-icons/fa6';
import { 
  RiHomeOfficeLine, 
  RiShoppingBagLine,
  RiBuildingLine,
  RiSeedlingLine,
  RiBankLine,
  RiHistoryLine,
  RiSettings4Line,
  RiWallet3Line,
  RiDashboardLine
} from "react-icons/ri";


const housingServices = [
  { id: 1, link: 'rent', label: 'Rent Apartment', icon: RiHomeOfficeLine },
  { id: 2, link: 'buy', label: 'Buy Apartment', icon: RiShoppingBagLine }
];

const Cooperative = [
  { id: 1, link: 'housing', label: 'Housing', icon: RiBuildingLine },
  { id: 2, link: 'agricultural', label: 'Agricultural', icon: RiSeedlingLine },
  { id: 3, link: 'credit', label: 'Credit & Thrift', icon: RiBankLine }
];

const Others = [
  { id: 1, link: 'transaction', label: 'Transactions', icon: RiHistoryLine },
  { id: 2, link: 'settings', label: 'Settings', icon: RiSettings4Line },
  { id: 3, link: 'payment', label: 'Payment Info', icon: RiWallet3Line }
];

const DashboardAside = ({ iscollapse, setiscollapse, mobileMenuOpen, setMobileMenuOpen, componentUserValue}) => {
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen(false);
    }
  };
  const userValue = componentUserValue.user;
 
 

  const NavItem = ({ icon: Icon, label, link }) => {
    // Determine if we should show the label
    const showLabel = iscollapse || mobileMenuOpen;
    
    return (
      <li className="group relative">
        <a
          href={`#${link}`}
          onClick={handleLinkClick}
          className="flex items-center px-4 py-3 text-[#003000] hover:text-[#2E7D32] transition-all duration-300 rounded-xl hover:bg-[#FDF6EC]"
        >
          <Icon size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
          <span className={`ml-4 whitespace-nowrap transition-all duration-300 ${
            showLabel ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'
          }`}>
            {label}
          </span>
          
          {/* Tooltip for collapsed state - only on desktop when sidebar is collapsed and mobile menu is closed */}
          {!iscollapse && !mobileMenuOpen && window.innerWidth >= 1024 && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-[#003000] text-[#FDF6EC] text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
              {label}
            </span>
          )}
        </a>
      </li>
    );
  };

  const SectionTitle = ({ title }) => {
    // Determine if we should show the section title
    const showTitle = iscollapse || mobileMenuOpen;
    
    return (
      <div className={`px-4 py-2 transition-all duration-300 ${
        showTitle ? 'opacity-100' : 'opacity-0 hidden'
      }`}>
        <span className="text-xs font-semibold text-[#2E7D32] uppercase tracking-wider">
          {title}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full py-2 bg-white ">
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between px-4 mb-0">
        <div className={`flex items-center transition-all duration-300 ${
          (iscollapse || mobileMenuOpen) ? 'opacity-100' : 'opacity-0 hidden'
        }`}>
          <div className="w-8 h-8 bg-[#F57C00] rounded-lg flex items-center justify-center">
            <span className="text-[#FDF6EC] font-bold text-xl">{
  userValue.full_name
    ?.split(' ')
    .map(name => name[0]?.toUpperCase())
    .join('')
}
  </span>
          </div>
          <span className="ml-3 text-[#003000] font-bold text-xl">Bethel <span className='text-cooperative-orange'>Cooperative</span></span>
        </div>
        
        
        {/* Mobile close button */}
        {mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-2 text-[#003000] hover:bg-[#FDF6EC] rounded-lg transition-colors"
          >
            <CiCircleRemove size={24} />
          </button>

        )}

        {/* Desktop toggle */}
        <button
          onClick={() => setiscollapse(!iscollapse)}
          className="hidden lg:block p-2 text-[#003000] hover:bg-[#FDF6EC] rounded-lg transition-colors"
        >
          <CiMenuBurger size={20} className={`transition-transform duration-300 ${
            !iscollapse ? 'rotate-180' : ''
          }`} />
        </button>
       
      </div>
      <div className={`text-cooperative-dark  font-bold py-4 px-4  flex-col gap-2 ${iscollapse ? 'flex': 'hidden'}`}>
        <div>@{userValue.username}</div>
        <div>{userValue.membership_id}</div>
        <div>Balance: <span><FaNairaSign className='inline' /> 0.00</span></div>
        </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#2E7D32]/20">
        {/* Dashboard Link */}
        <ul className="space-y-1">
          <NavItem icon={RiDashboardLine} label="Dashboard" link="dashboard" />
        </ul>

        {/* Housing Services */}
        <SectionTitle title="Housing" />
        <ul className="space-y-1 mb-4">
          {housingServices.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
          ))}
        </ul>

        {/* Cooperative */}
        <SectionTitle title="Cooperative" />
        <ul className="space-y-1 mb-4">
          {Cooperative.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
          ))}
        </ul>

        {/* Others */}
        <SectionTitle title="Others" />
        <ul className="space-y-1 mb-4">
          {Others.map((item) => (
            <NavItem key={item.id} icon={item.icon} label={item.label} link={item.link} />
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="px-4 mt-6">
        <button 
          onClick={handleLinkClick}
          className="flex items-center w-full px-4 py-3 text-[#003000] hover:text-[#F57C00] transition-all duration-300 rounded-xl hover:bg-[#FDF6EC] group"
        >
          <CiLogout size={20} className="flex-shrink-0 transition-transform group-hover:scale-110" />
          <span className={`ml-4 whitespace-nowrap transition-all duration-300 ${
            (iscollapse || mobileMenuOpen) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden'
          }`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default DashboardAside;