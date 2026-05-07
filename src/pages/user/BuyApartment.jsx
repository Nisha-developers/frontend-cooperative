import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  MapPin,
  Bed,
  Bath,
  Square,
  History,
  TrendingUp,
  Eye,
  Grid,
  List,
  Shield,
  Key,
  FileText,
  CheckCircle,
  Star,
  Phone,
  Mail,
  Heart,
  PiggyBank,
  Target,
  Clock,
  Calendar,
  CreditCard,
  ArrowRight,
  Building,
  Award,
  Wallet,
  Percent
} from 'lucide-react';
import { FaNairaSign } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { useSale } from '../../context/SaleContext';
import { createPortal } from 'react-dom';
import { usePurchase } from '../../context/PurchaseProvider';
import PopupMessage from '../../components/ui/PopupMessage';


const BuyApartment = () => {
  const [likedProperties, setLikedProperties] = useState([]);
  const location = useLocation();
  const {sales, fetchSales,  viewDetails} = useSale();
 const getValue = JSON.parse(sessionStorage.getItem('identityBuyKey'));
 const {previewApartment, title, message, open, type, preview, setPreview, applyPurchase, setOpen, getPurchase, } = usePurchase();
 const [isOpen, setIsOpen] = useState(false);
 const[installmentalOpen, setInstallmentalOpen] = useState(false);

 const headingParagraph = [
   {
     title: 'Buy an Apartment',
     description:'Complete the payment to get an apartment according to what you have chosen to buy',
     directionLink: '/buyApartment'
   },
   {
     title: 'Rent an Apartment',
     description:'Complete the payment to get an apartment according to what you have chosen to rent',
     directionLink: '/rentApartment'
   },
   {
     title: 'Buy a Land',
     description:'Complete the payment to get a land according to what you have chosen to buy',
     directionLink: ''
   },
 
 ] 
function GetActivity(){
  let index = 0
  if(getValue?.rememberBuy === 'rememberBuy'){
    index = 0
  }
  else if(getValue?.rememberBuy === 'rememberRent'){
    index = 1;
  }
  else{
    index = 2;
  }
  return index;
}

  
const apartmentId = location.state?.apartmentId ??   getValue?.apartmentId;



useEffect(()=>{
fetchSales();

}, [])


    const plan =  sales.find((val)=>val.id === apartmentId) ?? {};
  

   const continuePurchase = async() =>{
    
    if(getValue?.purchaseType === "INSTALLMENT" || location?.state?.purchaseType === "INSTALLMENT"){
   const getplan =  await viewDetails(apartmentId);
      const payload = {
       listing_id: apartmentId,
       purchase_type: 'INSTALLMENT',
       initial_deposit: getplan.minimum_initial_deposit,
       tenure_months:getplan.installment_duration_months
      }
     const paymentDetails = await previewApartment(payload);
     setPreview(paymentDetails);
     setInstallmentalOpen(true);
    }
    else{
      const payload = {
       listing_id: apartmentId,
       purchase_type: 'OUTRIGHT'
      }
     const paymentDetails = await previewApartment(payload);
     setPreview(paymentDetails);
     setIsOpen(true);
    }
    
   }
const confirmPurchase = async ()=>{
   if(getValue?.purchaseType === "INSTALLMENT" || location?.state?.purchaseType === "INSTALLMENT"){
    const getplan =  await viewDetails(apartmentId);
 const payload = {
       listing_id: apartmentId,
       purchase_type: 'INSTALLMENT',
        initial_deposit: getplan.minimum_initial_deposit,
       tenure_months:getplan.installment_duration_months
      }
  applyPurchase(payload);
  setInstallmentalOpen(false)

   }else{

  const payload = {
       listing_id: apartmentId,
       purchase_type: 'OUTRIGHT'
      }
  applyPurchase(payload);
  setIsOpen(false)
   }

  
}
if(!apartmentId || getValue?.rememberBuy === 'rememberRent'){
  return(
   <div className="min-h[90vh]bg-cooperative-cream flex items-center justify-center px-4 small-screen:px-6">
      <div className="max-w-md w-full text-center">
        {/* Animated icon / illustration container */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-cooperative-teal/10 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-cooperative-teal"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
              />
              <circle cx="9" cy="19" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="19" r="1" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-cooperative-dark mb-4">
          No Active Purchase
        </h1>

        {/* Description text */}
        <p className="text-cooperative-dark/70 text-base md:text-lg mb-8">
         
          Explore our available apartments and land and find your perfect home. Click the link below
        </p>

        {/* Call-to-action button */}
        <Link
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-cooperative-orange hover:bg-cooperative-orange/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cooperative-orange/50 focus:ring-offset-2"
        to='/buyApartment'>
          
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go to Buy Apartment Page 
        </Link>
         {/* Call-to-action button */}
        <Link
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white bg-cooperative-orange hover:bg-cooperative-orange/90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cooperative-orange/50 focus:ring-offset-2 mt-4"
        to='/LandSection'>
          
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Go to Buy land Page 
        </Link>

        {/* Optional: secondary link */}
        <p className="mt-6 text-sm text-cooperative-dark/50">
          Browse our collection of premium cooperative apartments
        </p>
      </div>
    </div>
  )
}


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">{headingParagraph[GetActivity()].title}</h1>
          <p className="text-cooperative-dark/70 mt-2"> {headingParagraph[GetActivity()].description}</p>
        </div>
      </div>

      

     {/* ── Active Plans Section ───────────────────────────────────────────────── */}
{plan.title && (() => {
  // Lightbox state lives on window to avoid hooks-outside-component error
  // Instead we use a self-contained inner component rendered inline
  const PlanCardWithLightbox = () => {
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const [lightboxIdx, setLightboxIdx] = React.useState(0);
    const [current, setCurrent] = React.useState(0);
    const images = Array.isArray(plan.images) ? plan.images : [];

    const openLightbox = (i, e) => { e?.stopPropagation(); setLightboxIdx(i); setCurrent(i); setLightboxOpen(true); };

    React.useEffect(() => {
      if (!lightboxOpen) return;
      const h = (e) => {
        if (e.key === 'ArrowLeft') setCurrent(c => (c - 1 + images.length) % images.length);
        if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % images.length);
        if (e.key === 'Escape') setLightboxOpen(false);
      };
      window.addEventListener('keydown', h);
      return () => window.removeEventListener('keydown', h);
    }, [lightboxOpen, images.length]);

    return (
      <>
        {/* ── Card ── */}
        <div className="bg-white border border-cooperative-dark/8 rounded-2xl overflow-hidden hover:shadow-[0_8px_32px_-8px_rgba(0,48,0,0.15)] transition-shadow duration-300">
          <div className="flex flex-col md:flex-row">

            {/* Image panel */}
            <div
              className="md:w-[220px] flex-shrink-0 relative overflow-hidden bg-cooperative-cream cursor-pointer group"
              style={{ minHeight: '200px' }}
              onClick={(e) => openLightbox(0, e)}
            >
              {images.length > 0 ? (
                <img
                  src={images[0].image_url}
                  alt={plan.title}
                  className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-cooperative-dark/20 text-5xl">🏠</div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-cooperative-dark/0 group-hover:bg-cooperative-dark/20 transition-colors duration-300" />

              {/* Photo count badge */}
              {images.length > 1 && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-cooperative-dark/80 text-white text-[10px] rounded-full font-medium">
                  🖼 {images.length}
                </div>
              )}

              {/* Hover hint */}
              {images.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white text-cooperative-dark text-xs font-semibold px-3 py-1.5 rounded-full">
                    View photos
                  </span>
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 flex gap-1 p-1.5 bg-cooperative-dark/60 backdrop-blur-sm">
                  {images.slice(0, 4).map((img, i) => (
                    <button
                      key={img.uid}
                      onClick={(e) => openLightbox(i, e)}
                      className={`flex-1 h-7 rounded overflow-hidden border transition-all ${i === 0 ? 'border-cooperative-orange' : 'border-white/30 hover:border-white/70'}`}
                    >
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  {images.length > 4 && (
                    <div className="flex-1 h-7 rounded bg-black/50 flex items-center justify-center">
                      <span className="text-white text-[9px] font-bold">+{images.length - 4}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content panel */}
            <div className="flex-1 p-5 flex flex-col justify-between">

              {/* Title + badge */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-cooperative-dark leading-tight capitalize">{plan.title}</h3>
                  <p className="text-xs text-cooperative-teal mt-1.5 flex items-center gap-1">
                    <span>📍</span>
                    {plan.address}, {plan.city}, {plan.state}
                  </p>
                </div>
                <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase border ${
                  plan.allows_installment
                    ? 'bg-cooperative-orange/10 text-cooperative-orange border-cooperative-orange/20'
                    : 'bg-cooperative-teal/10 text-cooperative-teal border-cooperative-teal/20'
                }`}>
                  {plan.allows_installment ? 'Installment' : 'Full Pay'}
                </span>
              </div>

              {/* Stat tiles */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-cooperative-cream rounded-xl p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-cooperative-dark/40 mb-1">Price</p>
                  <div className="flex items-center text-cooperative-dark font-bold text-sm">
                    <FaNairaSign className="text-cooperative-orange text-xs mr-0.5 flex-shrink-0" />
                    {Number(plan.price).toLocaleString()}
                  </div>
                </div>

                <div className="bg-cooperative-cream rounded-xl p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-cooperative-dark/40 mb-1">Area</p>
                  <p className="text-cooperative-dark font-bold text-sm">{plan.area_sqm} sqm</p>
                </div>
              </div>

              {/* Initial deposit row — installment only */}
              {plan.allows_installment && plan.minimum_initial_deposit && (
                <div className="flex items-center justify-between px-3 py-2.5 rounded-xl border border-cooperative-orange/20 bg-cooperative-orange/5 mb-4">
                  <span className="text-xs text-cooperative-dark/60 font-medium">Initial Deposit</span>
                  <div className="flex items-center text-cooperative-orange font-bold text-sm">
                    <FaNairaSign className="text-xs mr-0.5" />
                    {Number(plan.minimum_initial_deposit).toLocaleString()}
                  </div>
                </div>
              )}

              <div className="border-t border-cooperative-dark/6 mb-4" />

              {/* CTA */}
              <button
                onClick={() => {
                 continuePurchase();
                }}
                className="w-full py-3 bg-cooperative-orange hover:bg-cooperative-orange/90 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 group transition-colors duration-200"
              >
                <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                {getValue?.purchaseType === "INSTALLMENT" ? 'Pay on installment':'Pay in full'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Lightbox ── */}
        {lightboxOpen && images.length > 0 && createPortal(
          <div className="fixed inset-0 z-[9999] flex flex-col bg-cooperative-dark" onClick={() => setLightboxOpen(false)}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              <div>
                <p className="text-white font-semibold text-sm capitalize">{plan.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{current + 1} / {images.length}</p>
              </div>
              <button onClick={() => setLightboxOpen(false)} className="p-2 rounded-full bg-white/10 hover:bg-cooperative-orange text-white transition-colors text-xl leading-none">✕</button>
            </div>

            {/* Main image */}
            <div className="flex-1 flex items-center justify-center relative px-4 min-h-0" onClick={(e) => e.stopPropagation()}>
              {images.length > 1 && (
                <button
                  onClick={() => setCurrent(c => (c - 1 + images.length) % images.length)}
                  className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-cooperative-orange text-white transition-all text-xl"
                >←</button>
              )}
              <img
                key={current}
                src={images[current]?.image_url}
                alt={`Photo ${current + 1}`}
                className="max-h-full max-w-full object-contain rounded-xl select-none"
                style={{ maxHeight: 'calc(100vh - 200px)' }}
                draggable={false}
              />
              {images.length > 1 && (
                <button
                  onClick={() => setCurrent(c => (c + 1) % images.length)}
                  className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-cooperative-orange text-white transition-all text-xl"
                >→</button>
              )}
            </div>

            {/* Dots */}
            {images.length > 1 && (
              <div className="flex justify-center gap-1.5 py-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {images.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-200 ${i === current ? 'bg-cooperative-orange w-5 h-2' : 'bg-white/20 w-2 h-2 hover:bg-white/50'}`}
                  />
                ))}
              </div>
            )}

            {/* Thumbnails */}
            <div className="flex gap-2 px-5 pb-5 overflow-x-auto justify-center flex-shrink-0" onClick={(e) => e.stopPropagation()}>
              {images.map((img, i) => (
                <button key={img.uid} onClick={() => setCurrent(i)}
                  className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === current ? 'border-cooperative-orange scale-105' : 'border-white/20 opacity-50 hover:opacity-100'}`}
                >
                  <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
      </>
    );
  };

  return (
    <div className="mt-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cooperative-teal/10 rounded-xl">
          <Wallet className="w-5 h-5 text-cooperative-teal" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-cooperative-dark">Your Active Plans</h2>
          <p className="text-xs text-cooperative-dark/50 mt-0.5">Track and continue your property payments</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PlanCardWithLightbox />
      </div>
    </div>
  );
})()}
     
{isOpen && createPortal(
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-cooperative-dark/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-2xl bg-cooperative-cream overflow-hidden shadow-2xl">

      {/* Header */}
      <div className="bg-cooperative-dark px-6 py-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cooperative-teal/80 mb-1">Confirm Purchase</p>
        <h2 className="text-2xl font-bold text-cooperative-cream">Apartment Summary</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-5">

        {/* Purchase Type */}
        <div className="flex items-center justify-between rounded-lg bg-cooperative-dark/5 px-5 py-3">
          <span className="text-xs uppercase tracking-widest text-cooperative-dark/70 font-semibold">Purchase Type</span>
          <span className="rounded-full bg-cooperative-orange/10 px-4 py-1.5 text-xs font-bold text-cooperative-orange uppercase tracking-wider">
            {preview?.purchase_type}
          </span>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cooperative-teal/5 p-4 border border-cooperative-teal/20">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-teal mb-2">Property Price</p>
            <p className="text-lg font-bold text-cooperative-dark">₦{preview?.property_price?.toLocaleString() || 0}</p>
          </div>
          <div className="rounded-lg bg-cooperative-orange/5 p-4 border border-cooperative-orange/20">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-orange mb-2">Amount To Pay</p>
            <p className="text-lg font-bold text-cooperative-dark">₦{preview?.amount_to_pay?.toLocaleString()}</p>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between rounded-lg bg-cooperative-teal px-5 py-4">
          <span className="text-xs uppercase tracking-widest text-white font-semibold">Total Due</span>
          <span className="text-xl font-bold text-cooperative-cream">₦{preview?.amount_to_pay?.toLocaleString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 rounded-lg bg-cooperative-orange py-3.5 text-sm font-bold text-white hover:bg-cooperative-orange/90 transition-all duration-200" onClick={confirmPurchase}>
            Confirm Purchase
          </button>
          <button className="rounded-lg border border-cooperative-teal/20 px-6 py-3.5 text-sm font-semibold text-cooperative-dark hover:bg-cooperative-dark/5 transition-all duration-200" onClick={()=> setIsOpen(false)}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>,
  document.body
)}

{installmentalOpen && createPortal(
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-cooperative-dark/40 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-2xl bg-cooperative-cream overflow-x-hidden shadow-2xl h-[90vh]">

      {/* Header */}
      <div className="bg-cooperative-dark px-6 py-5">
        <p className="text-[10px] uppercase tracking-[0.2em] text-cooperative-teal/80 mb-1">Installment Plan</p>
        <h2 className="text-2xl font-bold text-cooperative-cream">Payment Breakdown</h2>
      </div>

      {/* Body */}
      <div className="px-6 py-6 space-y-5">

        {/* Property Price */}
        <div className="flex items-center justify-between rounded-lg bg-cooperative-dark/5 px-5 py-3">
          <span className="text-xs uppercase tracking-widest text-cooperative-dark/70 font-semibold">Property Price</span>
          <span className="rounded-full bg-cooperative-teal/10 px-4 py-1.5 text-xs font-bold text-cooperative-teal uppercase tracking-wider">
            ₦{preview?.property_price?.toLocaleString()}
          </span>
        </div>

        {/* Deposit + Monthly */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cooperative-teal/5 p-4 border border-cooperative-teal/20">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-teal mb-2">Initial Deposit</p>
            <p className="text-lg font-bold text-cooperative-dark">₦{preview?.initial_deposit?.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-cooperative-orange/5 p-4 border border-cooperative-orange/20">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-orange mb-2">Monthly Payment</p>
            <p className="text-lg font-bold text-cooperative-dark">₦{preview?.monthly_installment?.toLocaleString()}</p>
          </div>
        </div>

        {/* Tenure + Balance after deposit */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-cooperative-dark/5 p-4 border border-cooperative-dark/10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-dark/50 mb-2">Tenure</p>
            <p className="text-lg font-bold text-cooperative-dark">{preview?.tenure_months} <span className="text-sm font-medium text-cooperative-dark/60">months</span></p>
          </div>
          <div className="rounded-lg bg-cooperative-dark/5 p-4 border border-cooperative-dark/10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-cooperative-dark/50 mb-2">Balance After Deposit</p>
            <p className="text-lg font-bold text-cooperative-dark">₦{preview?.balance_after_deposit?.toLocaleString()}</p>
          </div>
        </div>

        {/* Total Repayable */}
        <div className="flex items-center justify-between rounded-lg bg-cooperative-teal px-5 py-4">
          <span className="text-xs uppercase tracking-widest text-white font-semibold">Total Repayable</span>
          <span className="text-xl font-bold text-cooperative-cream">₦{preview?.total_repayable?.toLocaleString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            className="flex-1 rounded-lg bg-cooperative-orange py-3.5 text-sm font-bold text-white hover:bg-cooperative-orange/90 transition-all duration-200"
            onClick={confirmPurchase}
          >
            Confirm Purchase
          </button>
          <button
            className="rounded-lg border border-cooperative-teal/20 px-6 py-3.5 text-sm font-semibold text-cooperative-dark hover:bg-cooperative-dark/5 transition-all duration-200"
            onClick={() => setInstallmentalOpen(false)}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>,
  document.body
)}

{createPortal(<PopupMessage isOpen={open} title={title} message={message} type={type} onClose={()=>setOpen(false)}/>,document.body)}
    
    </div>
  );
};

export default BuyApartment;