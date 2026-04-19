import React, { useEffect, useState } from 'react';
import Admindashboardheader from '../../components/admin/Admindashboardheader.jsx';
import AdminDashbordaside from '../../components/admin/AdminDashbordaside.jsx';
import Admindashboardmain from '../../components/admin/Admindashboardmain.jsx';
import Agricultural from '../../components/admin/Agricultural.jsx';
import CreditandThrift from '../../components/admin/CreditandThrift.jsx';
import HousingCooperative from '../../components/admin/HousingCooperative.jsx';
import Transaction from '../../components/admin/Transaction.jsx';
import HousingSale from '../../components/admin/HousingSale.jsx';
import SalesRequest from '../../components/admin/SalesRequest.jsx';
import ManageMember from '../../components/admin/ManageMember.jsx';
import { useAuth } from '../../context/AuthContext.jsx';


const DashboardLayout = () => {
  const [collapse, setCollapse] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const [activePage, setActivePage] = useState(
  window.location.hash.slice(1) || "dashboard"
);
const {user} = useAuth();
const userValue = user;
  const isAdmin = userValue?.user.is_admin;

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
   dashboard: Admindashboardmain,
   ControlHousing: HousingSale,
   manageRequest: SalesRequest,
  managehousing: HousingCooperative,
  managecredit: CreditandThrift,
  manageagricultural: Agricultural,
  transaction : Transaction,
  managemember: ManageMember
 };

const PageComponent = pages[activePage] || Admindashboardmain;

if(!isAdmin){
  return(<PopupMessage message="You are not authorized to view this page." title='Admin dashboard Error' type='error' isOpen = {true}/>);
}

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
        <AdminDashbordaside
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
          <Admindashboardheader
            mobileMenuOpen={mobileMenuOpen}
            iscollapse={collapse} 
            setMobileMenuOpen={setMobileMenuOpen}
             componentUserValue = {userValue}
          />
        </header>

       
      <main className="p-4 md:p-6">
          <PageComponent  componentUserValue = {userValue} />
        </main> 
      </div>
    </div>
  );
};

export default DashboardLayout;