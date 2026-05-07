import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";

 const RentContext = createContext();
export const RentProvider = ({ children }) => {
 
const {getAccessToken} = useAuth();
const token = getAccessToken();
const [title, setTitle] = useState('');
 const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');

     const [previewValue, setPreview] = useState({});
const PreviewRent = async(payload) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rent/preview/`,
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
        setTitle('Rent Error');
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
 setTitle('Rent error');
 console.log(data);
 setMessage(error);
 setOpen(true);
 setType('error')       
    }
} 

const ApplyRent = async(payload) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rent/apply/`,
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
        setTitle('Rent Error');
        setMessage(data[Object.keys(data)])
        setOpen(true);
        setType('error');
        return
      }
      setPreview(data);
      console.log(data);
        setTitle('Rent Success');
        setMessage('Your request is pending. We shall get back to you as soon as your request is approved via email or call');
        setOpen(true);
        setType('success');
        setTimeout(() => {
          sessionStorage.removeItem('identityBuyKey')
        }, 2000);
        
     return data;
    }
    catch (error) {
 setTitle('Rent error');
 console.log(data);
 setMessage(error);
 setOpen(true);
 setType('error')       
    }
} 
const getRentDetails =  async (id = '', status='') => {

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/rent/admin/${id}${status}`, {
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
   
      return data
    
    } catch (error) {
       setTitle('Purchase Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }

  const RentAction = async(id, action, payload) =>{
   try{
   const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/rent/admin/${id}/${action}/`,
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
        setTitle('Rent Error');
        setMessage(data[Object.keys(data)])
        setOpen(true);
        setType('error');
        return
      }
      setPreview(data);
 
        setTitle(` ${action} Error`);
        setMessage(`Request is being ${action === 'approve' ? 'accepted' : 'rejected'}. Users will be notified immediately`);
        setOpen(true);
        setType('success');
        sessionStorage.removeItem('identityBuyKey')
     
    }
    catch (error) {
 setTitle('Rent error');
 setMessage('An error has occured');
 setOpen(true);
 setType('error') 
 console.log(error);      
    }
} 

  const userRent =  async (id = '', status = '') => {
  const fetchUrl = `${import.meta.env.VITE_API_URL}/api/rent/${id}${status}`;
 
    try {
      const res = await fetch(fetchUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     

      const data = await res.json();
       if(!res.ok){
       setTitle('History Error');
       setMessage(data[Object.keys(data)]);
       setType('error');
    
       setOpen(true);
       return
      }
  
      return data
    
    } catch (error) {
       setTitle('History Request Error');
       console.log(error);
       setMessage(error[Object.keys(error)]);
       setType('error');
       setOpen(true);
    }
  }


  return (
    <RentContext.Provider value={{
        PreviewRent, previewValue, title, type, open,message,ApplyRent, setOpen,getRentDetails, RentAction, userRent
    }}>
      {children}
    </RentContext.Provider>
  );
};
export const useRent = () => useContext(RentContext);