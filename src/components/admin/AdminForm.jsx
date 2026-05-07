import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import {createPortal} from 'react-dom';
import PopupForm from '../ui/PopupForm';
import { useAuth } from '../../context/AuthContext';
import {useSale} from '../../context/SaleContext'
import PopupMessage from '../ui/PopupMessage';
import ImageUploadModal from '../ui/ImageUploadModal';


const AdminForm = () => {
  const [formField, setFormField] = useState({});
  const [formData, setFormData] = useState({});
  const [title, setTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [submitListing, setSubmitListing] = useState('');
  const [step, setStep] = useState('');
  const {getAccessToken, refreshAccessToken} = useAuth();
  const {sales,setSales} = useSale();
  const [message, setMessage] = useState('');
  const [titles, setTitles] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [error, seterror] = useState('')
  const [houseID, setHouseId] = useState('');
  const [imageModalOpen, setImageModalOpen] = useState(false);

  // Post Request Function Begins
  const postRequest = async (data) => {
  const path = '/listings/'; // since your endpoint is this

  const token = getAccessToken();
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    
   

    if (!response.ok) {
      console.log(result);
      if(response.status === 401){
        refreshAccessToken();
        fetchUser()
      }
       setisOpen(true)
      seterror('error');
      setMessage(result.message);
      setTitles('Add apartment error')
     
      throw new Error(result.message || 'Something went wrong');
    }
   setSales((prev) => [...prev, result]);
setHouseId(result.id);
setisOpen(true);
seterror('success');
setMessage('You have successfully added an apartment');
setTitles('Add listing successful');
setImageModalOpen(true);
    return result;
  } catch (error) {
    console.log(error)
     setisOpen(true)
      seterror('error');
      setMessage(error.message);
      setTitles('Add apartment error')
    console.error('POST ERROR:', error.message);
    throw error;
  }
};
const uploadListingImage = async (token, listingId, file) => {
  try {
    const formData = new FormData();
    formData.append("images", file); 

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/listings/${listingId}/images/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
         
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
  
      throw new Error(data.message || "Image upload failed");
    }

    return data;
  } catch (err) {
   
    console.error("UPLOAD ERROR:", err.message);
    throw err;
  }
};
  const uploadImageForModal = (listingId, file) => {
  const token = getAccessToken();
  return uploadListingImage(token, listingId, file);
};


  // ─── SHARED: Listing Type ────────────────────────────────────────────────────
   const imageField = [
  {
    name: 'images',
    type: 'file',
    label: 'Upload Images',
    required: true,
    accept: 'image/*',
    multiple: true,
  },
];

  const listingType = [
    {
      name: 'listing_type',
      type: 'radio',
      label: 'Listing Type',
      required: true,
      options: [
        { label: 'Sale', value: 'sale' },
        { label: 'Rent', value: 'rent' },
        { label: 'Land', value: 'land' },
      ],
    },
  ];

  // ─── SALE STEPS ─────────────────────────────────────────────────────────────
  const listingType1Sale = [
    { label: 'Title', name: 'title', placeholder: 'eg Luxury 4 Bedroom Duplex', required: true },
    { label: 'Description', name: 'description', placeholder: 'eg. A spacious modern duplex located in a serene environment', required: true },
    { label: 'Address', name: 'address', placeholder: 'eg 15 Admiralty Way', required: true },
    { label: 'State', name: 'state', placeholder: 'eg Lagos', required: true },
    { label: 'City', name: 'city', placeholder: 'eg Lekki', required: true },
  ];

  const listingType2Sale = [
    { type: 'number', name: 'price', label: 'Price', placeholder: 'eg 1200000', required: true, min: 10000 },
    {
      name: 'allows_installment', type: 'radio', label: 'Allow Installment', required: true,
      options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    },
  ];
 

  const listingType3Installment = [
    { label: 'Initial Payment', name: 'minimum_initial_deposit', type: 'number', placeholder: 'eg 200000', required: true, min: 1000 },
    { label: 'Installment Duration (Months)', name: 'installment_duration_months', type: 'number', placeholder: 'eg 12', required: true, min: 1 },
  ];

  const listingTypeFinalSale = [
   
    { label: 'Bedrooms', name: 'bedrooms', type: 'number', required: true, min: 0 },
    { label: 'Bathrooms', name: 'bathrooms', type: 'number', required: true, min: 0 },
    { label: 'Toilets', name: 'toilets', type: 'number', required: true, min: 0 },
    { label: 'Area (sqm)', name: 'area_sqm', type: 'number', placeholder: 'eg 350', required: true, min: 1 },
    {
      name: 'is_furnished', type: 'radio', label: 'Is Furnished?', required: true,
      options: [{ label: 'Yes', value: true }, { label: 'No', value: false }],
    },
  ];

  // ─── RENT STEPS ──────────────────────────────────────────────────────────────
 const listingType1Rent = [
  { label: 'Title', name: 'title', placeholder: 'eg 2 Bedroom Apartment', required: true },

  { label: 'Description', name: 'description', placeholder: 'eg Clean apartment in a secure estate', required: true },

  { label: 'Address', name: 'address', placeholder: 'eg 12 Freedom Street', required: true },

  { label: 'State', name: 'state', placeholder: 'eg Lagos', required: true },
   { label: 'City', name: 'city', placeholder: 'eg Yaba', required: true },
];
const listingType2Rent = [
  { type: 'number', name: 'price_per_day', label: 'Price per day (₦)', placeholder: 'eg 2500000', required: true },
];
const listingType3Rent = [

  { label: 'Bedrooms', name: 'bedrooms', type: 'number', required: true, min: 0 },

  { label: 'Bathrooms', name: 'bathrooms', type: 'number', required: true, min: 0 },

  { label: 'Toilets', name: 'toilets', type: 'number', required: true, min: 0 },
];
const listingTypeFinalRent = [
     { label: 'Area (sqm)', name: 'area_sqm', type: 'number', placeholder: 'eg 120', required: true, min: 1 },

  {
    name: 'is_furnished',
    type: 'radio',
    label: 'Is Furnished?',
    required: true,
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
];

  // ─── LAND STEPS ──────────────────────────────────────────────────────────────
  const listingType1Land = [
  { label: 'Title', name: 'title', placeholder: 'eg Dry Land at Ibeju Lekki', required: true },

  { label: 'Description', name: 'description', placeholder: 'eg Good investment land close to Dangote refinery', required: true },

  { label: 'Address', name: 'address', placeholder: 'eg Eleko Junction', required: true },
];
const listingType2Land = [
  { label: 'State', name: 'state', placeholder: 'eg Lagos', required: true },

  { label: 'City', name: 'city', placeholder: 'eg Ibeju-Lekki', required: true },

   {
    name: 'allows_installment',
    type: 'radio',
    label: 'Allow Installment?',
    required: true,
    options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ],
  },
];

const listingType3LandInstallment = [
  {
    label: 'Installment Duration (Months)',
    name: 'installment_duration_months',
    type: 'number',
    placeholder: 'eg 12',
    required: true,
    min: 1,
  },

  {
    label: 'Minimum Initial Deposit (₦)',
    name: 'minimum_initial_deposit',
    type: 'number',
    placeholder: 'eg 20000000',
    required: true,
    min: 1000,
  },
];
const listingTypeFinalLand = [
  
  {
    label: 'Price', name: 'price', placeholder: 'eg 8500000', required: true,
    type: 'number' 
  },
  { label: 'Land Size (sqm)', name: 'area_sqm', type: 'number', placeholder: 'eg 600', required: true, min: 1 },
 
];


  // ─── Open the form ────────────────────────────────────────────────────────────
  const chooseListingType = () => {
    setFormData({});
    setOpen(true);
    setStep('type');
    setFormField(listingType);
    setTitle('Choose Listing Type');
    setSubmitListing('Next');
  };

  // ─── Central Submit Handler ───────────────────────────────────────────────────
  const handleSubmit = async (data) => {
   
       const updated = { ...formData, ...data };
  setFormData(updated);
      // ── TYPE SELECTION ──────────────────────────────────────────────────────
      if (step === 'type') {
        if (data.listing_type === 'sale') {
          setStep('sale1');
          setFormField(listingType1Sale);
          setTitle('Sale — Basic Info');
          setSubmitListing('Next');
        } else if (data.listing_type === 'rent') {
          setStep('rent1');
          setFormField(listingType1Rent);
          setTitle('Rent — Basic Info');
          setSubmitListing('Next');
        } else if (data.listing_type === 'land') {
          setStep('land1');
          setFormField(listingType1Land);
          setTitle('Land — Basic Info');
          setSubmitListing('Next');
        }

      // ── SALE FLOW ───────────────────────────────────────────────────────────
      } else if (step === 'sale1') {
        setStep('sale2');
        setFormField(listingType2Sale);
        setTitle('Sale — Pricing');
        setSubmitListing('Next');

      } else if (step === 'sale2') {
   
        if (data.allows_installment === true) {
          setStep('sale_installment');
          setFormField(listingType3Installment);
          setTitle('Sale — Installment Details');
          setSubmitListing('Next');
        } else {
          setStep('sale_final');
          setFormField(listingTypeFinalSale);
          setTitle('Sale — Property Details');
          setSubmitListing('Submit Listing');
        }

      } else if (step === 'sale_installment') {
      
        setStep('sale_final');
        setFormField(listingTypeFinalSale);
        setTitle('Sale — Property Details');
        setSubmitListing('Submit Listing');

      } else if (step === 'sale_final') {
        const fullData = { ...updated, property_type: 'house', listing_type: 'sale' };
       
        
      await postRequest(fullData);
        setOpen(false);
         

      // ── RENT FLOW ───────────────────────────────────────────────────────────
      } else if (step === 'rent1') {
        setStep('rent2');
        setFormField(listingType2Rent);
        setTitle('Rent — Pricing');
        setSubmitListing('Next');

      } else if (step === 'rent2') {
        setStep('rent3');
        setFormField(listingType3Rent);
        setTitle('Rent — Property Details');
        setSubmitListing('Next');

      } else if (step === 'rent3') {
        setStep('rent_final');
        setFormField(listingTypeFinalRent);
        setTitle('Rent — Final Lap');
        setSubmitListing('Submit Listing');

      } else if (step === 'rent_final') {
        console.log(data);
        const fullData = { ...updated, property_type: 'house', listing_type: 'rent', price: updated.price_per_day};
        console.log(fullData);
       
         await postRequest(fullData);
        // axios.post('/api/listings', fullData);
  
        setOpen(false);

      // ── LAND FLOW ───────────────────────────────────────────────────────────
      } else if (step === 'land1') {
        setStep('land2');
        setFormField(listingType2Land);
        setTitle('Land — Pricing & Size');
        setSubmitListing('Next');

      } else if (step === 'land2') {
        if (data.allows_installment === true) {
          setStep('land_installment');
          setFormField(listingType3LandInstallment);
          setTitle('Land — Installment Details');
          setSubmitListing('Next');
        } else {
          setStep('land_final');
          setFormField(listingTypeFinalLand);
          setTitle('Land — Documents & Use');
          setSubmitListing('Submit Listing');
        }

      } else if (step === 'land_installment') {
        setStep('land_final');
        setFormField(listingTypeFinalLand);
        setTitle('Land — Documents & Use');
        setSubmitListing('Submit Listing');

      } else if (step === 'land_final') {
        const fullData = { ...updated, property_type: 'land', listing_type: 'sale' };
       
        await postRequest(fullData);
        // axios.post('/api/listings', fullData);
        setOpen(false);
      }

      return updated;
  };

  return (
    <section>
      <div className='bg-white w-full h-[60px] flex items-center'>
        <div
          className='float-right py-2 px-4 rounded-md text-white font-bold bg-cooperative-orange ml-auto hover:bg-orange-800 duration-100 cursor-pointer'
          onClick={chooseListingType}
        >
          Add Listing
        </div>
      </div>
      {imageModalOpen && (
  <ImageUploadModal
    isOpen={imageModalOpen}
    onClose={() => setImageModalOpen(false)}
    listingId={houseID}
    uploadFn={uploadImageForModal}
    onDone={() => setImageModalOpen(false)}
  />
)}
      {createPortal(
        <PopupForm
          formfield={formField}
          title={title}
          isOpen={open}
          onClose={() => setOpen(false)}
          submitLabel={submitListing}
          onSubmit={handleSubmit}
        />,
        document.body
      )}
      {isOpen&& createPortal(
        <PopupMessage title={titles} message={message} type={error} isOpen={isOpen}  onClose={()=>setisOpen(false)}/>
      , document.body)}
    </section>
  );
};

export default AdminForm;






