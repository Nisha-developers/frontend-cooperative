import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';



const Input = () => {
    const {token} = useAuth();
let userinfo = {};
const [phoneNo, setPhoneNo] = useState('');
const [AccountNo, setAccountNo] = useState('');
const [AccountName, setAccountName] = useState('');
const [bankName, setBankName] = useState('');
const [location, setLocation] = useState('');
const handleSubmit = (e) =>{
  e.preventDefault();
   userinfo = {
    phone_number: phoneNo,
    account_number: AccountNo,
    bank_name: bankName,
    address: location,
    account_name: AccountName,  
  }

  console.log(token);
  const createProfile = async () => {
  const response = await fetch("http://localhost:8000/api/users/profile/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userinfo),
  });

  const data = await response.json();
  console.log(data);
};
createProfile()
  setLocation('');
  setAccountNo('')
  setAccountName('');
  setPhoneNo('');
  setBankName('')
}

 


  return (
    <div className='bg-cooperative-orange/10 text-cooperative-dark h-screen flex justify-center items-center flex-col pt-20 max-sm:[100%]'>
        <div className='w-[90%] max-w-[600px] bg-white p-8 rounded-md mt-20 animate-spinIn opacity-0 scale-0'>
        <h2 className='font-extrabold  mb-[1.6rem] text-2xl'>Please fill in the following form</h2>
        <form action="" className='' onSubmit={handleSubmit}>
         <label className='block pb-2 w-[100%]'>Phone Number</label>
         <input type="tel" className='w-[100%] bg-cooperative-teal/30 mb-4 outline-none p-[0.5rem] rounded-md' onChange={(e)=>setPhoneNo(e.target.value)}/>
         <label className='block pb-2 w-[100%]'>Account Number</label>
         <input type="number" maxLength={10} minLength={10} className='w-[100%]  bg-cooperative-teal/30 mb-4 outline-none p-[0.5rem] rounded-md' onChange={(e)=>setAccountNo(e.target.value)}/>
         <label className='block pb-2 w-[100%]'>Account Name</label>
         <input type="text" className='w-[100%]  bg-cooperative-teal/30 mb-4 outline-none p-[0.5rem] rounded-md'onChange={(e)=>setAccountName(e.target.value)} />
         <label className='block pb-2 w-[100%] '>Bank Name</label>
         <input type="text" className='w-[100%]  bg-cooperative-teal/30 mb-4 outline-none p-[0.5rem] rounded-md' onChange={(e)=>{setBankName(e.target.value)}}/>
         <label className='block pb-2 w-[100%]'>Location</label>
         <input type="text"  className='w-[100%]  bg-cooperative-teal/30 mb-4 outline-none p-[0.5rem] rounded-md' onChange={(e)=>setLocation(e.target.value)}/>
         <button className='block mx-auto px-10 bg-cooperative-orange py-2 text-white font-bold rounded-md'>Submit</button>
        </form>
        </div>
    </div>
  )
}

export default Input