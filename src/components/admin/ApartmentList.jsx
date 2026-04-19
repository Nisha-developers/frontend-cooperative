import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FaCouch } from "react-icons/fa";
import { ImPriceTag } from "react-icons/im";
import image from '../../assets/images/frames-for-your-heart-mR1CIDduGLc-unsplash.jpg'
import { createPortal } from 'react-dom';
import DetailedInfo from './DetailedInfo';
import { useAuth } from '../../context/AuthContext';
import { useSale } from '../../context/SaleContext';
import PopupMessage from '../ui/PopupMessage';

const ApartmentList = ({ valueApartMent }) => {
  const [detailInfo, setDetailInfo] = useState({});
  const [detailShown, setDetailShow] = useState(false);
  const [filter, setFilter] = useState('all');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isopen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const { getAccessToken } = useAuth();
  const { setSales, viewDetails } = useSale();
  const token = getAccessToken();

  // ── Filter logic ─────────────────────────────────────────────────────────────
  const filtered = filter === 'all'
    ? valueApartMent
    : valueApartMent.filter(item => item.listing_type === filter);

  // ── View details ─────────────────────────────────────────────────────────────
  const viewDetail = async(id) =>{
       const moreDetail =await viewDetails(id);
       console.log(moreDetail);
        setDetailInfo(moreDetail);
      setDetailShow(true);  
  }
  // ── Edit ─────────────────────────────────────────────────────────────────────
  const handleEdit = (data) => {
    editListing(detailInfo.id, data, token);
  };

  const editListing = async (id, updatedData, token) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        setIsOpen(true);
        setMessage('Edit failed. Please check and try again.');
        setError('error');
        setTitle('Edit Error');
        return;
      }

      setIsOpen(true);
      setMessage('Listing updated successfully.');
      setError('success');
      setTitle('Edit Successful');
      setSales(prev =>
        prev.map(sale => sale.id === id ? { ...sale, ...updatedData } : sale)
      );
      return data;
    } catch (error) {
      setIsOpen(true);
      setMessage('Edit failed. Please check and try again.');
      setError('error');
      setTitle('Edit Error');
      console.error('Error updating listing:', error.message);
    }
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    deleteListing(id, token);
  };

  const deleteListing = async (id, token) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        setIsOpen(true);
        setMessage('Delete failed. Please login and try again.');
        setError('error');
        setTitle('Delete Error');
        return;
      }

      setIsOpen(true);
      setMessage('Listing deleted successfully.');
      setError('success');
      setTitle('Delete Successful');
      setSales(prev => prev.filter(sale => sale.id !== id));
      setDetailShow(false);
    } catch (error) {
      setIsOpen(true);
      setMessage('Delete failed. Please Log in and try again');
      setError('error');
      setTitle('Delete Error');
      console.error('Error deleting listing:', error.message);
    }
  };

  // ── Empty state ───────────────────────────────────────────────────────────────
  if (filtered.length === 0) {
    return (
      <div>
              <div className='flex justify-between items-center max-sm:flex-col max-sm:items-start mb-4 mt-4'>
        <h1 className='font-bold text-[clamp(1.5rem,2vw,2.5rem)]'>Available Listings</h1>
        <div className='flex gap-x-2 items-center max-sm:mt-3'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cooperative-teal'
          >
            <option value="all">All ({valueApartMent.length})</option>
            <option value="sale">Sale ({valueApartMent.filter(i => i.listing_type === 'sale').length})</option>
            <option value="rent">Rent ({valueApartMent.filter(i => i.listing_type === 'rent').length})</option>
            <option value="land">Land ({valueApartMent.filter(i => i.property_type === 'land').length})</option>
          </select>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='p-3 w-[95%] mt-[4rem] flex items-center justify-center bg-white shadow-[2px_2px_8px] shadow-cooperative-brown font-bold text-[clamp(1rem,3vw,2rem)] rounded-lg text-center'>
          {filter === 'all'
            ? 'No listings found. Click Add Listing to get started.'
            : `No ${filter} listings found.`}
        </div>
      </div>
      </div>
    );
  }

  // ── Card renderer — shows only fields relevant to the listing type ────────────
  const renderCardBody = (val) => {
    const type = val.property_type === 'land' ? 'land' : val.listing_type; // 'sale' | 'rent' | 'land'

    return (
      <>
        {/* Title + Area (not for land since land uses area_sqm differently) */}
        <div className='flex justify-between px-3 font-bold flex-wrap'>
          <div>{val.title}</div>
          {val.area_sqm && <div>Area: {val.area_sqm} sqm</div>}
        </div>

        {/* Beds/Baths — only for sale and rent */}
        {(type === 'sale' || type === 'rent') && (
          <div className='px-3'>
            <span className='font-bold text-2xl text-cooperative-orange relative -top-[3px] mr-[3px]'>.</span>
            {`${val.bathrooms} ${val.bathrooms > 1 ? 'bathrooms' : 'bathroom'}`}
            <span className='font-bold text-2xl text-cooperative-orange relative -top-[3px] mx-[3px]'>.</span>
            {`${val.bedrooms} ${val.bedrooms > 1 ? 'bedrooms' : 'bedroom'}`}
          </div>
        )}

        {/* Rent duration — only for rent */}
        {type === 'rent' && val.rent_duration && (
          <div className='px-3 text-sm text-gray-600'>Duration: {val.rent_duration}</div>
        )}

        {/* Location */}
        <div className='px-3 flex gap-x-2 items-center'>
          <FaLocationDot className='text-cooperative-teal' />
          {val.city} — {val.state}
        </div>

        {/* Price */}
        <div className='flex flex-col px-3'>
          <div className='flex gap-x-2 items-center'>
            <ImPriceTag className='text-cooperative-teal' />
            Price: <span className='font-extrabold text-cooperative-teal'>₦{Number(val.price).toLocaleString()}</span>
          </div>

          {/* Installment — sale and land */}
          {(type === 'sale' || type === 'land') && val.allows_installment && (
            <div className='text-cooperative-orange text-sm font-medium'>Installment available</div>
          )}

          {/* Property type badge */}
          <div className='mt-1'>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize
              ${type === 'sale' ? 'bg-blue-100 text-blue-800' :
                type === 'rent' ? 'bg-green-100 text-green-800' :
                'bg-amber-100 text-amber-800'}`}>
              {type}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      {/* ── Filter bar ─────────────────────────────────────────────────────── */}
      <div className='flex justify-between items-center max-sm:flex-col max-sm:items-start mb-4 mt-4'>
        <h1 className='font-bold text-[clamp(1.5rem,2vw,2.5rem)]'>Available Listings</h1>
        <div className='flex gap-x-2 items-center max-sm:mt-3'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cooperative-teal'
          >
            <option value="all">All ({valueApartMent.length})</option>
            <option value="sale">Sale ({valueApartMent.filter(i => i.listing_type === 'sale').length})</option>
            <option value="rent">Rent ({valueApartMent.filter(i => i.listing_type === 'rent').length})</option>
            <option value="land">Land ({valueApartMent.filter(i => i.property_type === 'land').length})</option>
          </select>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <div className={`grid py-8 px-2 gap-6 
        ${filtered.length === 1
          ? 'grid-cols-2 max-sm:grid-cols-1'
          : 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'}
        auto-rows-[450px] rounded-xl`}>
        {filtered.map((val) => (
          <div
            key={val.id}
            className='bg-white shadow-cooperative-teal/50 shadow-[2px_2px_10px] rounded-2xl flex flex-col h-full gap-[2px]'
          >
            {/* Image */}
            <div className='relative m-2'>
              <img src={image} alt="" className='h-[200px] w-full rounded-2xl object-cover' />
              <div className='absolute h-8 w-8 rounded-full right-3 top-2 bg-white flex items-center justify-center text-cooperative-teal'>
                <FaLocationDot />
              </div>
              {/* Furnished icon — only for sale/rent */}
              {val.property_type !== 'land' && (
                <div className='absolute h-8 w-8 rounded-full right-12 top-2 bg-white flex items-center justify-center'>
                  <FaCouch className={val.is_furnished ? 'text-green-600' : 'text-red-600'} />
                </div>
              )}
            </div>

            {/* Card body */}
            <div className='flex flex-col flex-1 gap-1'>
              {renderCardBody(val)}
            </div>

            {/* View More */}
            <button
              className='h-[40px] w-[50%] px-3 bg-cooperative-orange text-white rounded-md mt-auto mb-3 mx-3 hover:bg-orange-950 duration-700'
              onClick={()=>viewDetail(val.id)}
            >
              View More
            </button>
          </div>
        ))}
      </div>

      {/* ── Detail modal ───────────────────────────────────────────────────── */}
      {detailShown && createPortal(
        <DetailedInfo
          onClose={() => setDetailShow(false)}
          onDelete={handleDelete}
          onEdit={handleEdit}
          samplePropertyData={detailInfo}
        />,
        document.body
      )}

      {isopen && createPortal(
        <PopupMessage
          title={title}
          message={message}
          type={error}
          isOpen={isopen}
          onClose={() => setIsOpen(false)}
        />,
        document.body
      )}
    </div>
  );
};

export default ApartmentList;