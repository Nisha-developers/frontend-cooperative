import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { TbCurrencyNaira } from "react-icons/tb";
import {
  RiMapPinLine,
  RiPriceTagLine,
  RiTimeLine,
  RiWallet3Line,
  RiHeartLine,
  RiHeartFill,
  RiSofaLine,
  RiHome5Line,
} from "react-icons/ri";
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import {
  AnimateOnScroll,
  StaggerWrapper,
  StaggerItem,
  fadeUp,
  fadeLeft,
} from '../../animations/AnimateOnScroll.jsx';
import { createPortal } from 'react-dom';
import { useSale } from '../../context/SaleContext.jsx';
import PopupMessage from '../ui/PopupMessage.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';


const EASE = [0.22, 1, 0.36, 1];

const ApartmentCard = ({ apartment, purchasefunc, setpurchasefunc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [message, setmessage] = useState('');
  const [title, setTitle] = useState('');
  const [open, setopen] = useState(false);
  const [error, seterror] = useState('');
  const navigate =useNavigate();
 const {user} = useAuth();
const purchaseFunction = () =>{
   const availableUser = user?.user && (user?.user?.is_admin);
   console.log(availableUser);
  setpurchasefunc(prev => {
    const updated = [...prev, apartment];

    const value = new Set(updated);

    console.log(value);
    localStorage.setItem('rentVal', JSON.stringify([...value]));
    return updated
  });
 if(availableUser){
  setopen(true);
setmessage('Redirecting to dashboard for payment completion');
setTitle(`Payment of ${apartment.title}`);
seterror('success');

setTimeout(() => {
    navigate('/dashboard#rent');
}, 3000);
 }
 else{
   setopen(true);
setmessage('You must login to complete the payment. Redirecting to login page');
setTitle(`Payment of ${apartment.title}`);
seterror('error');

setTimeout(() => {
    navigate('/login', {state: 'rememberRent'});
}, 4500);
 }
}
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden group"
      whileHover={{ y: -6, boxShadow: "0 24px 48px -8px rgba(0,0,0,0.18)" }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-[#e8f5e9] flex items-center justify-center">
        <RiHome5Line className="text-[#2E7D32] text-6xl opacity-30" />
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
              <RiHeartLine className="text-gray-400 text-xl" />
            )}
          </motion.span>
        </motion.button>

        {/* Furnished badge */}
        <div className="absolute top-3 left-3">
          <div
            className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
              apartment.is_furnished
                ? 'bg-[#F57C00] text-white'
                : 'bg-white/80 text-gray-500'
            }`}
          >
            <RiSofaLine />
            <span>{apartment.is_furnished ? 'Furnished' : 'Unfurnished'}</span>
          </div>
        </div>

        {/* Status badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${
              apartment.status === 'available'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {apartment.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-[#003000] mb-1 capitalize">{apartment.title}</h3>
        <p className="text-xs text-[#F57C00] uppercase tracking-wider mb-3 font-semibold">
          {apartment.property_type}
        </p>

        {/* Location */}
        <div className="flex items-start gap-2 mb-4">
          <RiMapPinLine className="text-[#F57C00] text-lg flex-shrink-0 mt-0.5" />
          <p className="text-sm text-[#2E7D32]">
            {apartment.address}, {apartment.city}, {apartment.state}
          </p>
        </div>

        {/* Specs */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#FDF6EC] flex-wrap">
          <span className="text-xs font-medium text-[#003000]">{apartment.bedrooms} Beds</span>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <span className="text-xs font-medium text-[#003000]">{apartment.bathrooms} Baths</span>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <span className="text-xs font-medium text-[#003000]">{apartment.toilets} Toilets</span>
          <div className="w-1 h-1 rounded-full bg-[#2E7D32]" />
          <span className="text-xs font-medium text-[#003000]">
            {Number(apartment.area_sqm).toFixed(0)} sqm
          </span>
        </div>

        {/* Description */}
        <div className="pb-4 text-sm text-gray-400 leading-relaxed border-l-2 border-[#F57C00] pl-3 mb-1 break-words">
          {apartment.description}
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
            <div className="flex items-center text-base font-bold text-[#003000]">
              <TbCurrencyNaira />
              {Number(apartment.price).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FDF6EC] rounded-lg">
                <RiTimeLine className="text-[#F57C00] text-sm" />
              </div>
              <span className="text-sm text-[#2E7D32]">Lease Duration</span>
            </div>
            <span className="text-sm font-medium text-[#003000]">
              {apartment.rent_duration
                ? `${apartment.rent_duration} month${apartment.rent_duration > 1 ? 's' : ''}`
                : 'Flexible'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#FDF6EC]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#F57C00] rounded-lg">
                <RiWallet3Line className="text-white text-sm" />
              </div>
              <span className="text-sm font-semibold text-[#003000]">Total Amount</span>
            </div>
            <div className="flex items-center text-lg font-bold text-[#F57C00]">
              <TbCurrencyNaira />
              {apartment.rent_duration
                ? (Number(apartment.price) * Number(apartment.rent_duration)).toLocaleString()
                : Number(apartment.price).toLocaleString()}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.button
          className="w-full py-3 bg-[#F57C00] hover:bg-[#F57C00]/90 text-white font-semibold rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: EASE }}
          onClick={purchaseFunction}
        >
          Continue with Payment
        </motion.button>
          {createPortal(<PopupMessage isOpen = {open} title={title} message={message} type={error} onClose={()=>setopen(false)} />, document.body)}
      </div>
    </motion.div>
  );
};

const RentApartment = () => {
  const { sales, viewDetails } = useSale();
  const [saleDetails, setSaleDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bg, setBg] = useState(false);
 const [purchaseFunction, setpurchaseFunction] = useState([]);
  useEffect(() => {
    setBg(true);
  }, []);

  useEffect(() => {
    if (sales.length === 0) return;

    const rentIds = sales
      .filter((val) => val.listing_type === 'rent')
      .map((val) => val.id)
      .slice(0, 5); // first 5 only

    if (rentIds.length === 0) {
      setLoading(false);
      return;
    }

    const getFullDetails = async () => {
      setLoading(true);
      const details = await Promise.all(rentIds.map((id) => viewDetails(id)));
      setSaleDetails(details.filter(Boolean));
      setLoading(false);
    };

    getFullDetails();
  }, [sales.length, viewDetails]);

  const totalRents = sales.filter((v) => v.listing_type === 'rent').length;

  return (
    <div className="space-y-6 mt-[6rem]">
      <div className="bg-[#003000]">
        <Navbar bgvar={bg} setbgvar={setBg} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4">
        <AnimateOnScroll variant={fadeLeft} delay={0.1} duration={0.6}>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#003000] text-center mt-[10px]">
              Rent Apartment
            </h1>
            <p className="text-[#2E7D32] mt-1 text-center">
              Find your perfect home from our curated listings
            </p>
          </div>
        </AnimateOnScroll>
      </div>

      {loading ? (
        <p className="text-center text-[#2E7D32] py-10">Loading apartments...</p>
      ) : saleDetails.length === 0 ? (
        <p className="text-center text-[#2E7D32] py-10">No apartments available.</p>
      ) : (
        <StaggerWrapper
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5"
          stagger={0.13}
          delay={0.15}
          amount={0.05}
        >
          {saleDetails.map((apartment) => (
            <StaggerItem key={apartment.id} variant={fadeUp} duration={0.55}>
              <ApartmentCard apartment={apartment}  setpurchasefunc = {setpurchaseFunction} purchasefunc = {purchaseFunction}/>
            </StaggerItem>
          ))}
        </StaggerWrapper>
      )}

      {/* Only show if more than 5 rent listings */}
      {totalRents > 5 && (
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
      )}

      <Footer />

      {createPortal(<div className="z-[100030]" />, document.body)}
    </div>
  );
};

export default RentApartment;