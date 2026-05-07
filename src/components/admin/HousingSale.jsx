import React, { useState } from 'react'
import AdminForm from './AdminForm'
import AdminStatsCard from './AdminStatsCard';
import ApartmentList from './ApartmentList';
import { useSale } from '../../context/SaleContext';

const HousingSale = () => {
  const { sales } = useSale();
  const theSales = Array.isArray(sales) ? sales : [];
  const fmt = (n) => `₦${Number(n).toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const houseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11L12 4l9 7"></path>
      <path d="M5 10v10h5v-6h4v6h5V10"></path>
      <path d="M2 21h20"></path>
    </svg>
  );

  const moneyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M6 12h.01M18 12h.01"></path>
    </svg>
  );

  return (
    <div>
      <AdminForm />
      <section className='mt-4'>
        <ApartmentList valueApartMent={theSales.filter((val)=>val.status === 'available')} titles= 'Available Listings' showAll = {true} allowDeleteEdit = {true}/>
      </section>
       <section className='mt-1'>
        <ApartmentList valueApartMent={theSales.filter((val)=>val.status === 'pending')} titles= 'Pending Listings' showAll = {true} allowDeleteEdit = {false}/>
      </section>
       <section className='mt-1'>
        <ApartmentList valueApartMent={theSales.filter((val)=>val.status === 'sold')} titles= 'Purchased Listings' showAll = {true} allowDeleteEdit = {false} />
          </section>
           <section className='mt-1'>
        <ApartmentList valueApartMent={theSales.filter((val)=>val.status === 'rented')} titles= 'Rented Listings' showAll = {false} allowDeleteEdit = {false}/>
          </section>
    </div>
  );
};

export default HousingSale;