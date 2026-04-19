import React, { useState } from 'react'
import AdminForm from './AdminForm'
import AdminStatsCard from './AdminStatsCard';
import ApartmentList from './ApartmentList';
import { useSale } from '../../context/SaleContext';

const HousingSale = () => {
  const { sales } = useSale();
  const theSales = Array.isArray(sales) ? sales : [];

  // ── Derived stats ─────────────────────────────────────────────────────────────
  const totalAmount   = theSales.reduce((t, s) => t + (Number(s.price) || 0), 0);
  const saleListings  = theSales.filter(s => s.listing_type === 'sale');
  const rentListings  = theSales.filter(s => s.listing_type === 'rent');
  const landListings  = theSales.filter(s => s.property_type === 'land');
  const saleAmount    = saleListings.reduce((t, s) => t + (Number(s.price) || 0), 0);
  const rentAmount    = rentListings.reduce((t, s) => t + (Number(s.price) || 0), 0);
  const landAmount    = landListings.reduce((t, s) => t + (Number(s.price) || 0), 0);
  const furnished     = theSales.filter(s => s.is_furnished).length;
  const installment   = theSales.filter(s => s.allows_installment).length;

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
      {/* ── Stats grid ──────────────────────────────────────────────────────── */}
      <div className='grid sm:grid-cols-2 gap-3 lg:grid-cols-3 mb-10'>
        <AdminStatsCard label='Total Listings'       amount={theSales.length}          bigStyle={true} icon={houseIcon} />
        <AdminStatsCard label='Sale Listings'        amount={saleListings.length}       icon={houseIcon} />
        <AdminStatsCard label='Rent Listings'        amount={rentListings.length}       icon={houseIcon} />
        <AdminStatsCard label='Land Listings'        amount={landListings.length}       icon={houseIcon} />
        <AdminStatsCard label='Furnished'            amount={furnished}                 icon={houseIcon} />
        <AdminStatsCard label='Allow Installment'    amount={installment}               icon={houseIcon} />
        <AdminStatsCard label='Total Value'          amount={fmt(totalAmount)}          bigStyle={true} icon={moneyIcon} />
        <AdminStatsCard label='Sale Amount'          amount={fmt(saleAmount)}           icon={moneyIcon} />
        <AdminStatsCard label='Rent Amount'          amount={fmt(rentAmount)}           icon={moneyIcon} />
        <AdminStatsCard label='Land Amount'          amount={fmt(landAmount)}           icon={moneyIcon} />
      </div>

      {/* ── Add listing form ────────────────────────────────────────────────── */}
      <AdminForm />

      {/* ── Listings with built-in filter ───────────────────────────────────── */}
      <section className='mt-4'>
        <ApartmentList valueApartMent={theSales} />
      </section>
    </div>
  );
};

export default HousingSale;