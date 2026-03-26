import React, { useEffect, useState } from 'react';
import DashboaHeader from './DashboadHeader.jsx';
import DashboardAside from './DashboardAside.jsx';
import Dashboardmain from './Dashboardmain.jsx';
import AgricCooperative from '../../pages/user/AgricCooperative.jsx';
import BuyApartment from '../../pages/user/BuyApartment.jsx';
import RentApartment from '../../pages/user/RentApartment.jsx';

import CreditAndThrift from '../../pages/user/CreditAndThrift.jsx';
import PaymentInfo from '../../pages/user/PaymentInfo.jsx';
import Setting from '../../pages/user/Setting.jsx';
import Transaction from '../../pages/user/Transaction.jsx';
import HousingCooperative from '../../pages/user/HousingCooperative.jsx';
import { useAuth } from '../../context/AuthContext.jsx';




const DashboardLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [activePage, setActivePage] = useState(
  window.location.hash.slice(1) || "dashboard"
);
const {user} = useAuth();
const userValue = user;

useEffect(() => {
  const handleHashChange = () => {
    setActivePage(window.location.hash.slice(1));
  };

  window.addEventListener("hashchange", handleHashChange);

  return () => {
    window.removeEventListener("hashchange", handleHashChange);
  };
}, []);
const pages = {
  dashboard: Dashboardmain,
  rent:RentApartment,
  buy: BuyApartment,
  housing: HousingCooperative,
  agricultural: AgricCooperative,
  credit: CreditAndThrift,
  transaction: Transaction,
  settings: Setting,
  payment: PaymentInfo
};

const PageComponent = pages[activePage] || Dashboardmain;


  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 transition-opacity duration-300 lg:hidden z-40 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-[#003000]/10 transition-all duration-500 ease-in-out z-50 max-lg:w-[250px]
          ${collapse ? 'w-[280px]' : 'w-[70px]'} 
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <DashboardAside 
          iscollapse={collapse} 
          setiscollapse={setCollapse}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          componentUserValue = {userValue}
        />
      </aside>

      {/* Main Content */}
      <div 
        className={`transition-all duration-500 ease-in-out min-h-screen
          ${collapse ? 'lg:ml-[280px]' : 'lg:ml-[80px]'}`}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-[#003000]/10">
          <DashboaHeader 
            mobileMenuOpen={mobileMenuOpen}
            iscollapse={collapse} 
            setMobileMenuOpen={setMobileMenuOpen}
             componentUserValue = {userValue}
          />
        </header>

        {/* Main Area */}
        <main className="p-4 md:p-6">
          <PageComponent  componentUserValue = {userValue} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;