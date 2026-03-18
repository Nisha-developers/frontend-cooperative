import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  RiMapPinLine, 
  RiPriceTagLine, 
  RiWallet3Line,
  RiHeartLine,
  RiHeartFill,
  RiHome5Line,
  RiGroupLine,
  RiBankLine,
  RiCheckboxCircleLine
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

const EASE = [0.22, 1, 0.36, 1];

// Sample apartment data for purchase
const apartments = [
  {
    id: 1,
    title: "Luxury 3-Bedroom Apartment",
    location: "Victoria Island, Lagos",
    price: "₦85,000,000",
    installmentPrice: "₦8,500,000",
    installmentPeriod: "10 months",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format",
    reviews: 124,
    bedrooms: 3,
    bathrooms: 3,
    sqft: "2,400 sq ft",
    furnished: true,
    cooperativeEligible: true
  },
  {
    id: 2,
    title: "Modern 2-Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦65,000,000",
    installmentPrice: "₦6,500,000",
    installmentPeriod: "10 months",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format",
    reviews: 98,
    bedrooms: 2,
    bathrooms: 2,
    sqft: "1,800 sq ft",
    furnished: false,
    cooperativeEligible: true
  },
  {
    id: 3,
    title: "Cozy 1-Bedroom Studio",
    location: "Ikeja, Lagos",
    price: "₦35,000,000",
    installmentPrice: "₦3,500,000",
    installmentPeriod: "10 months",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&auto=format",
    reviews: 156,
    bedrooms: 1,
    bathrooms: 1,
    sqft: "1,200 sq ft",
    cooperativeEligible: true
  },
  {
    id: 4,
    title: "Executive 4-Bedroom Mansion",
    location: "Banana Island, Lagos",
    price: "₦120,000,000",
    installmentPrice: "₦12,000,000",
    installmentPeriod: "10 months",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&auto=format",
    reviews: 87,
    bedrooms: 4,
    bathrooms: 4,
    sqft: "3,200 sq ft",
    cooperativeEligible: true
  }
];

const CooperativeBenefits = () => {
  return (
    <AnimateOnScroll variant={fadeUp} delay={0.1} duration={0.6}>
      <div className="bg-cooperative-cream rounded-2xl p-6 mb-8 border border-cooperative-teal/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-cooperative-orange rounded-xl">
            <RiGroupLine className="text-white text-2xl" />
          </div>
          <h2 className="text-xl font-bold text-cooperative-dark">Housing Cooperative Benefits</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <RiCheckboxCircleLine className="text-cooperative-orange text-xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cooperative-dark">Pay in Installments</h3>
              <p className="text-sm text-cooperative-teal">Spread payments over 10 months with 0% interest</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <RiCheckboxCircleLine className="text-cooperative-orange text-xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cooperative-dark">Cooperative Membership</h3>
              <p className="text-sm text-cooperative-teal">Join our cooperative for exclusive member benefits</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <RiCheckboxCircleLine className="text-cooperative-orange text-xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-cooperative-dark">Priority Access</h3>
              <p className="text-sm text-cooperative-teal">First access to new listings and special offers</p>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
};

const ApartmentCard = ({ apartment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showInstallment, setShowInstallment] = useState(false);

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
              <RiHeartFill className="text-cooperative-orange text-xl" />
            ) : (
              <RiHeartLine className="text-cooperative-dark text-xl" />
            )}
          </motion.span>
        </motion.button>

        {/* Cooperative Badge */}
        {apartment.cooperativeEligible && (
          <div className="absolute top-3 left-3">
            <div className="px-3 py-1 bg-cooperative-orange text-white text-xs font-semibold rounded-full flex items-center gap-1">
              <RiGroupLine className="text-xs" />
              <span>Cooperative Eligible</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-cooperative-dark mb-1">{apartment.title}</h3>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <RiMapPinLine className="text-cooperative-orange text-lg flex-shrink-0 mt-1" />
          <p className="text-sm text-cooperative-teal">{apartment.location}</p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-cooperative-cream">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-cooperative-dark">{apartment.bedrooms} Beds</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-cooperative-teal" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-cooperative-dark">{apartment.bathrooms} Baths</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-cooperative-teal" />
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium text-cooperative-dark">{apartment.sqft}</span>
          </div>
        </div>

        {/* Price Options Toggle */}
        <div className="flex gap-2 mb-4">
          <motion.button
            onClick={() => setShowInstallment(false)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              !showInstallment 
                ? 'bg-cooperative-dark text-white' 
                : 'bg-cooperative-cream text-cooperative-dark'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Full Payment
          </motion.button>
          <motion.button
            onClick={() => setShowInstallment(true)}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              showInstallment 
                ? 'bg-cooperative-orange text-white' 
                : 'bg-cooperative-cream text-cooperative-dark'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Pay on Installment
          </motion.button>
        </div>

        {/* Price Details */}
        <div className="space-y-3 mb-5">
          {!showInstallment ? (
            // Full Payment Option
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-cooperative-cream rounded-lg">
                  <RiBankLine className="text-cooperative-orange text-sm" />
                </div>
                <span className="text-sm text-cooperative-teal">Total Price</span>
              </div>
              <div className="text-right">
                <span className="text-base font-bold text-cooperative-dark">{apartment.price}</span>
                <span className="text-xs text-cooperative-teal ml-1">one-time</span>
              </div>
            </div>
          ) : (
            // Installment Payment Option
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cooperative-cream rounded-lg">
                    <RiHome5Line className="text-cooperative-orange text-sm" />
                  </div>
                  <span className="text-sm text-cooperative-teal">Property Price</span>
                </div>
                <span className="text-base font-bold text-cooperative-dark">{apartment.price}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-cooperative-cream">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cooperative-orange rounded-lg">
                    <RiGroupLine className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-semibold text-cooperative-dark">Cooperative Installment</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-cooperative-orange">{apartment.installmentPrice}</span>
                  <span className="text-xs text-cooperative-teal ml-1">per month</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-cooperative-teal">
                <span>0% interest for 10 months</span>
                <span>via cooperative membership</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          className={`w-full py-3 font-semibold rounded-xl shadow-lg ${
            showInstallment
              ? 'bg-cooperative-orange hover:bg-cooperative-orange/90 text-white'
              : 'bg-cooperative-dark hover:bg-cooperative-dark/90 text-white'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          {showInstallment ? 'Join Cooperative & Pay Installment' : 'Purchase Property'}
        </motion.button>

        {/* Cooperative Join Link */}
        {showInstallment && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-2 text-xs text-cooperative-teal"
          >
            New to cooperative? <button className="text-cooperative-orange font-semibold hover:underline">Join here</button>
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

const BuyApartment = () => {
  const [filter, setFilter] = useState('all');
  const [bg, setbg] = useState(false);

  useEffect(() => {
    setbg(true);
  }, []);
   
  return (
    <div className="space-y-6 mt-[6rem]">
      <div className='bg-cooperative-dark'>
        <Navbar bgvar={bg} setbgvar={setbg} />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 px-5">
        <AnimateOnScroll variant={fadeLeft} delay={0.1} duration={0.6}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-cooperative-dark text-center mt-[10px]">Buy Apartment</h1>
            <p className="text-cooperative-teal mt-1 text-center">Own your dream home with flexible payment options</p>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Cooperative Benefits Section */}
      <div className="px-5">
        <CooperativeBenefits />
      </div>

      {/* Apartments Grid */}
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

      {/* View More Button */}
      <AnimateOnScroll variant={fadeUp} delay={0.1} duration={0.6}>
        <div className="flex justify-center pt-4">
          <motion.button
            className="px-8 py-3 bg-white text-cooperative-dark font-semibold rounded-xl border-2 border-cooperative-orange hover:bg-cooperative-orange hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            View More Properties
          </motion.button>
        </div>
      </AnimateOnScroll>

      <Footer />
    </div>
  );
};

export default BuyApartment;