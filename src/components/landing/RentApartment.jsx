import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  RiMapPinLine, 
  RiPriceTagLine, 
  RiTimeLine, 
  RiWallet3Line,
  RiHeartLine,
  RiHeartFill,
  RiStarFill,
  RiStarHalfFill,
  RiStarLine
} from "react-icons/ri";
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { useState } from 'react';
import {
  AnimateOnScroll,
  StaggerWrapper,
  StaggerItem,
  fadeUp,
  fadeLeft,
  scaleIn,
} from '../../animations/AnimateOnScroll.jsx';
import { createPortal } from 'react-dom';
import PopupForm from '../ui/PopupForm.jsx';


const EASE = [0.22, 1, 0.36, 1];

// Sample apartment data
const apartments = [
  {
    id: 1,
    title: "Luxury 3-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦850,000",
    duration: "per month",
    totalPrice: "₦10,200,000",
    totalDuration: "12 months",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format",
    reviews: 124,
    bedrooms: 3,
    bathrooms: 3,
    sqft: "2,400 sq ft",
    furnished: true
  },
  {
    id: 2,
    title: "Modern 2-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦650,000",
    duration: "per month",
    totalPrice: "₦7,800,000",
    totalDuration: "12 months",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format",
   
    reviews: 98,
    bedrooms: 2,
    bathrooms: 2,
    sqft: "1,800 sq ft",
    furnished: false
  },
  {
    id: 3,
    title: "Cozy 1-Bedroom Studio",
    location: "Ikeja, Lagos",
    price: "₦350,000",
    duration: "per month",
    totalPrice: "₦4,200,000",
    totalDuration: "12 months",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format",
    reviews: 156,
    bedrooms: 1,
    bathrooms: 1,
    sqft: "1,200 sq ft",
  },
  {
    id: 4,
    title: "Executive 4-Bedroom Mansion",
    location: "Banana Island, Lagos",
    price: "₦1,200,000",
    duration: "per month",
    totalPrice: "₦14,400,000",
    totalDuration: "12 months",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format",
    reviews: 87,
    bedrooms: 4,
    bathrooms: 4,
    sqft: "3,200 sq ft",
  }
];
// const formfields = [
//   { name: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', required: true },
//   { name: 'email', label: 'Email', type: 'email', placeholder: 'you@email.com', required: true },
//   { name: 'dob', label: 'Date of Birth', type: 'date', required: false },
//   { name: 'amount', label: 'Amount (₦)', type: 'number', placeholder: '0.00' },
//   { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+234...' },
//   { name: 'password', label: 'Password', type: 'password' },
//   { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
//   { name: 'status', label: 'Status', type: 'radio', options: ['Active', 'Inactive'] },
//   { name: 'agree', label: 'I agree to terms', type: 'checkbox' },
//   { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional info...' },
//   { name: 'avatar', label: 'Profile Photo', type: 'image', accept: 'image/*' },
//   { name: 'document', label: 'Document', type: 'file', accept: '.pdf,.doc,.docx' },
//   { name: 'color', label: 'Colour', type: 'color' },
//   { name: 'range', label: 'Priority', type: 'range', min: 1, max: 10 },
//   { name: 'website', label: 'Website', type: 'url' },
//   { name: 'time', label: 'Time', type: 'time' },
//   { name: 'month', label: 'Month', type: 'month' }
// ];

const ApartmentCard = ({ apartment }) => {
  const [isLiked, setIsLiked] = useState(false);


  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={apartment.image} 
          alt={apartment.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Like Button */}
        <motion.button 
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            key={isLiked ? "liked" : "unliked"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {isLiked ? (
              <RiHeartFill className="text-[#F57C00] text-xl" />
            ) : (
              <RiHeartLine className="text-[#003000] text-xl" />
            )}
          </motion.span>
        </motion.button>

     
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-[#003000] mb-1">{apartment.title}</h3>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <RiMapPinLine className="text-[#F57C00] text-lg flex-shrink-0 mt-1" />
          <p className="text-sm text-[#2E7D32]">{apartment.location}</p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#FDF6EC]">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-[#003000]">{apartment.bedrooms} Beds</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-[#003000]">{apartment.bathrooms} Baths</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-[#003000]">{apartment.sqft}</span>
          </div>
        </div>

        {/* Price Details */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FDF6EC] rounded-lg">
                <RiPriceTagLine className="text-[#F57C00] text-sm" />
              </div>
              <span className="text-sm text-[#2E7D32]">Monthly Rent</span>
            </div>
            <div className="text-right">
              <span className="text-base font-bold text-[#003000]">{apartment.price}</span>
              <span className="text-xs text-[#2E7D32] ml-1">{apartment.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FDF6EC] rounded-lg">
                <RiTimeLine className="text-[#F57C00] text-sm" />
              </div>
              <span className="text-sm text-[#2E7D32]">Lease Duration</span>
            </div>
            <span className="text-sm font-medium text-[#003000]">{apartment.totalDuration}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#FDF6EC]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F57C00] rounded-lg">
                <RiWallet3Line className="text-white text-sm" />
              </div>
              <span className="text-sm font-semibold text-[#003000]">Total Amount</span>
            </div>
            <span className="text-lg font-bold text-[#F57C00]">{apartment.totalPrice}</span>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          className="w-full py-3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-semibold rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          Continue with Payment
        </motion.button>
      </div>
    </motion.div>
  );
};

const RentApartment = () => {
  const [filter, setFilter] = useState('all');
  const [bg, setbg] = useState(false);
    const [open, setOpen] = useState(false);

  useEffect(() => {
    setbg(true);
  }, []);
   
  return (
    <div className="space-y-6 mt-[6rem]">
      <div className='bg-cooperative-dark'>
        <Navbar bgvar={bg} setbgvar={setbg} />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">

        {/* Title — slides in from left */}
        <AnimateOnScroll variant={fadeLeft} delay={0.1} duration={0.6}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#003000] text-center mt-[10px]">Rent Apartment</h1>
            <p className="text-[#2E7D32] mt-1 text-center">Find your perfect home from our curated listings</p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Apartments Grid — staggered card reveal on scroll */}
      <StaggerWrapper
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5"
        stagger={0.13}
        delay={0.15}
        amount={0.05}
      >
        {apartments.map((apartment) => (
          <StaggerItem key={apartment.id} variant={fadeUp} duration={0.55}>
            <ApartmentCard apartment={apartment} />
          </StaggerItem>
        ))}
      </StaggerWrapper>

      {/* View More Button — fades up on scroll */}
      <AnimateOnScroll variant={fadeUp} delay={0.1} duration={0.6}>
        <div className="flex justify-center pt-4">
          <motion.button
            className="px-8 py-3 bg-white text-[#003000] font-semibold rounded-xl border-2 border-[#F57C00] hover:bg-[#F57C00] hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            View More Apartments
          </motion.button>
        </div>
      </AnimateOnScroll>
   
      <Footer />
   {createPortal(
    <div className='z-[100030]'>
  {/* <PopupForm
    title="File Details"
    formfield={formfields}   
    onSubmit={(data) => console.log(data)}
    onClose={() => setOpen(true)}
    isOpen={open}
    submitLabel="Submit"
  /> */}
  </div>,document.body
)}
    </div>
  );
};

export default RentApartment;