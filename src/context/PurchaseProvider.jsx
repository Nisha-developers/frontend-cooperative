import { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";

const PurchaseContext = createContext();
export const PurchaseProvider = ({children}) =>{
    const {getAccessToken} = useAuth();
    const token = getAccessToken();
    
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [preview, setPreview] = useState({});
    const [purchaseData, setPurchaseData] = useState([]);
  const previewApartment = async (payload) =>{
    try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/purchase/preview/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if(!res.ok){
     
        setTitle('Preview Error');
        setMessage(data[Object.keys(data)])
        setOpen(true);
        setType('error');
        return
      }
      setPreview(data);
      console.log(data);
      
      return data;
    }
    catch (error) {
 setTitle('Preview error');
 console.log(data);
 setMessage(error);
 setOpen(true);
 setType('error')       
    }
  }
const applyPurchase = async(payload) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/purchase/apply/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if(!res.ok){
        console.log(data)
        setTitle('Preview Error');
        setMessage(data[Object.keys(data)])
        setOpen(true);
        setType('error');
        return
      }
      setPreview(data);
      console.log(data);
        setTitle('Purchase Success');
        setMessage('Your request is pending. We shall get back to you as soon as your request is approved via email or call');
        setOpen(true);
        setType('success');
        setTimeout(() => {
          sessionStorage.removeItem('identityBuyKey')
        }, 2000);
        
     
    }
    catch (error) {
 setTitle('Purchase error');
 console.log(data);
 setMessage(error);
 setOpen(true);
 setType('error')       
    }
} 
const getPurchase =  async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
      //  setTitle('Purchase Request Error');
      //  setMessage(data[Object.keys(data)]);
      //  setType('error');
      
      //  setOpen(true);
       return
      }
      setPurchaseData(data);
    
      return data
    
    } catch (error) {
       setTitle('Purchase Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }
  const getPurchaseDetails =  async (id) => {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       setTitle('Purchase Request Error');
       setMessage(data[Object.keys(data)]);
       setType('error');
    
       setOpen(true);
       return
      }
      console.log(data);
   
      return data
    
    } catch (error) {
       setTitle('Purchase Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }
  const getAdminPurchase =  async () => {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/admin/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       setTitle('Purchase Request Error');
       setMessage(data[Object.keys(data)]);
       setType('error');
       console.log(data)
       setOpen(true);
       return
      }
    
      return data
    
    } catch (error) {
       setTitle('Purchase Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }

  const getAdminPurchaseDetails =  async (id) => {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/purchase/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       setTitle('Purchase Request Error');
       setMessage(data[Object.keys(data)]);
       setType('error');
       console.log(data)
       setOpen(true);
       return
      }
  
      return data
    
    } catch (error) {
       setTitle('Purchase Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }
  const purchaseAction = async(id, action, payload) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/purchase/admin/${id}/${action}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
           body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if(!res.ok){
        console.log(data)
        setTitle('Preview Error');
        setMessage(data[Object.keys(data)])
        setOpen(true);
        setType('error');
        return
      }
      setPreview(data);
 
        setTitle('Purchase Error');
        setMessage(`Request is being ${action === 'approve' ? 'accepted' : 'rejected'}. Users will be notified immediately`);
        setOpen(true);
        setType('success');
        sessionStorage.removeItem('identityBuyKey')
     
    }
    catch (error) {
 setTitle('Purchase error');
 setMessage('An error has occured');
 setOpen(true);
 setType('error') 
 console.log(error);      
    }
} 
const deleteListing = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/listings/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (response.ok) {
      console.log('Listing deleted successfully');
    } else {
      console.log('Failed to delete listing');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
const deleteImage = async (listingId, imageUid) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/listings/${listingId}/images/${imageUid}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      console.log('Image deleted successfully');
    } else {
      console.log('Failed to delete image');
    }
  } catch (err) {
    console.error(err);
  }
};
useEffect(()=>{
  getPurchase(token);
}, [token])

const repayLoan = async(id) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/purchase/${id}/pay/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      if(!res.ok){
        console.log(data)
        setTitle('Repay Error');
        setMessage(data.message)
        setOpen(true);
        setType('error');
        return
      }
      
      console.log(data);
        setTitle('Repayment Success');
        setMessage(`An amount of ${Number(data.amount_deducted).toLocaleString() } is being Deducted. ${data.message}`);
        setOpen(true);
        setType('success');
        return data
    }
    catch (error) {
 setTitle('Repayment error');
 setMessage(error);
 console.log(error)
 setOpen(true);
 setType('error')       
    }
} 

return(
    <PurchaseContext.Provider value={{
        previewApartment,
        title,
        message, 
        open,
        type,
        setPreview,
        preview,
        applyPurchase,
        setOpen,
        getPurchase,
        getPurchaseDetails,
        getAdminPurchase,
        getAdminPurchaseDetails,
        purchaseAction,
        deleteListing,
        deleteImage,
        setPurchaseData,
        purchaseData, 
        repayLoan
    }}>
        {children}
    </PurchaseContext.Provider>
);

};
export const usePurchase = () => useContext(PurchaseContext);