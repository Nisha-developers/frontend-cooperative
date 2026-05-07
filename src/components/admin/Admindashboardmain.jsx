import React, { useState, useEffect, useMemo } from 'react';
import AdminStatsCard from './AdminStatsCard';
   
import Request from './Request';
import { useAuth } from '../../context/AuthContext';
import PopupMessage from '../ui/PopupMessage';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { RiCloseCircleFill } from 'react-icons/ri';
// The value component begins
const NoValue = ({theValue})=>{
  return(
     <div className="min-h-[200px] flex items-center justify-center bg-cooperative-cream text-cooperative-dark p-6 rounded-lg border border-cooperative-teal/20">
  <div className="text-center space-y-2">
    <h2 className="text-lg font-semibold text-cooperative-dark">
      No {theValue} request yet
    </h2>
  </div>
</div>
  )
}


//  the value component ends
const AdminDashboard = () => {
  const {user, getAccessToken} = useAuth();
  const [isopen, setopen] = useState(false);
 const [open, setOpen] = useState(false);
 const [messages, setMessages] = useState('');
 const [titles, setTitles] = useState('');
 const [types, setTypes] = useState('');
  const navigate = useNavigate();
  const token = getAccessToken();
  const [modalAction, setModalAction] = useState('');
  const [activity, setActivity] = useState('');
  const [declineReason,setDeclineReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [statData, setStatsData] = useState({user: null, transactions: null, pending: null, loans:null, rent:null });
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [showReceiptModal ,setShowReceiptModal] = useState(false);
  const [loading, setLoading] = useState(true); // ← ADDED
const handleAccept = (item, type) =>{
 
 setActivity(type)
  setSelectedTransaction(item);
setShowModal(true);
setModalAction('accept')
}
const handleReject = (item, type) =>{
console.log(item);
   setActivity(type)
  setSelectedTransaction(item);
setShowModal(true);
setModalAction('decline')
}
const showReceipt =(item) =>{
  setSelectedTransaction(item);
  setShowReceiptModal(true);
}
const Approve = async (uid, action, value, type) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/${type}/${uid}/${action}/`,{
        method: 'POST',
       headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
          body: JSON.stringify(value),

        }
    );

    const data = await res.json(); 



    if (!res.ok) {
      if(res.status === 400){
        setOpen(true);
      setMessages('You must state the reason for rejection');
      setTitles('Rejection Error');
      setTypes('error');
      }
      else{
          setOpen(true);
      setMessages('There is an error, please try again');
      setTitles('Rejection Error');
      setTypes('error');
      }
      

      throw new Error("Server error");
      
    }
    if(action === 'approve'){
        setOpen(true);
      setMessages('You have successfully accepted a transaction. An email will be sent to the user immediately');
      setTitles('Approval Success');
      setTypes('success');
    }
    else{
        setOpen(true);
      setMessages('You have successfully declined a transaction. An email will be sent to the user immediately');
      setTitles('Decline Success');
      setTypes('success');
    }
  
  } catch (error) {
   
      setOpen(true);
      setMessages('There is an error, please try again');
      setTitles('Rejection Error');
      setTypes('error');
  }
};

 const getLength = async(token, endpoint) =>{
  try{
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
    );
   const data = await res.json();

   if(!res.ok){
    throw Error('There is a mistake please Check and try again');
   }
  
return data;
  }
  catch(err){
    console.log(err);
  }
 }
 
 

    useEffect(() => {
  const fetchAll = async () => {
    setLoading(true); // ← ADDED
    const [users, transactions, listings, loans, house, rent] = await Promise.all([
      getLength(token, 'users/get-users/'),
      getLength(token, 'wallet/admin/transactions/?status=PENDING'),
      getLength(token, 'listings'),
       getLength(token, 'loan/admin/?status=PENDING' ),
      getLength(token, 'purchase/admin/?status=PENDING'),
      getLength(token, 'rent/admin/?status=PENDING')
     
   
       
    ]);

    setStatsData({
      users,
      transactions,
      listings,
      loans,
      house,
      rent
    });
    setLoading(false); // ← ADDED
  };

  fetchAll();
}, []);  

   
  const apartmentAmount = statData?.listings?.reduce((total, value)=> total+= Number(value.price), 0);

  const paymentRequest  =  statData?.transactions?.results?.slice(0, 3)?? [];
 
  const rentRequest = statData?.rent?.results?.slice(0, 3)?? [];
  console.log(rentRequest);



  const getNovalue = (theArray = []) =>{
    if(theArray.length > 0){
      return true
    }
    else{
      return false
    }
  }
  const ActionBasedonType = (activity, action, value) => {
  const messages = {
    rent: `Are you sure you want to ${action} the rent request for ${value?.listing_title} from ${value?.user_email}?`,
    loan: `Are you sure you want to ${action} the loan request of ₦${Number(value?.principal).toLocaleString()} from ${value?.user_email}?`,
    transaction: `Are you sure you want to ${action} the transaction of  ₦${Number(value?.amount).toLocaleString()} from ${value?.full_name}?`,
    default: `Are you sure you want to ${action} the purchase of ${value?.listing} at ${value?.location} from ${value?.user}?`,
  };

  return messages[activity] || messages.default;
};

  const loanLength = statData?.loans?.results.length;
  const transactionLength = statData?.transactions?.results.length
  const houseLength =  statData?.house?.length
  const rentLength = statData?.rent?.count
  console.log(rentLength);
  const loanPendingRequest = statData?.loans?.results?.slice(0, 3)?? [];
  const housePendingRequest = statData?.house?.slice(0, 3)?? [];



const confirmAction = ()=>{
  // uid, action, value, type
  if(modalAction === 'accept' && activity === 'transaction'){
Approve(selectedTransaction.uid, 'approve', {}, 'wallet/admin/transactions');
 setStatsData((prev) => {
      const updatedResults = prev.transactions.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        transactions: {
          ...prev.transactions,
          results: updatedResults,
          count: prev.transactions.count - 1,
        },
      };
    });
    
  }
   else if(modalAction === 'accept' && activity === 'loan'){
Approve(selectedTransaction.uid, 'approve', {}, 'loan/admin');
setStatsData((prev) => {
      const updatedResults = prev.loans.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        loans: {
          ...prev.loans,
          results: updatedResults,
          count: prev.loans.count - 1,
        },
      };
    });

   }
    else if(modalAction === 'decline' && activity === 'loan'){
Approve(selectedTransaction.uid, 'reject', {rejection_reason:declineReason}, 'loan/admin');
setStatsData((prev) => {
      const updatedResults = prev.loans.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        loans: {
          ...prev.loans,
          results: updatedResults,
          count: prev.loans.count - 1,
        },
      };
    });

    }
  else if(modalAction === 'decline' && activity === 'transaction'){
    Approve(selectedTransaction.uid, 'reject', {rejection_reason:declineReason}, 'wallet/admin/transactions')
     setStatsData((prev) => {
      const updatedResults = prev.transactions.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        transactions: {
          ...prev.transactions,
          results: updatedResults,
          count: prev.transactions.count - 1,
        },
      };
    });
  
  }
  else if (modalAction === 'accept' && activity === 'house') {
    Approve(selectedTransaction.uid, 'approve', {}, 'purchase/admin');
    setStatsData((prev) => {
      const updatedResults = prev.house.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        house: {
          ...prev.house,
          results: updatedResults,
          count: prev.house.count - 1,
        },
      };
    });

  } else if (modalAction === 'decline' && activity === 'house') {
    Approve(selectedTransaction.uid, 'reject', { rejection_reason: declineReason }, 'purchase/admin');
     setStatsData((prev) => {
      const updatedResults = prev.house.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        house: {
          ...prev.house,
          results: updatedResults,
          count: prev.house.count - 1,
        },
      };
    });
  }
  else if (modalAction === 'accept' && activity === 'rent') {
    Approve(selectedTransaction.uid, 'approve', {}, 'rent/admin');
    setStatsData((prev) => {
      const updatedResults = prev.rent.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        rent: {
          ...prev.rent,
          results: updatedResults,
          count: prev.rent.count - 1,
        },
      };
    });

  } else if (modalAction === 'decline' && activity === 'rent') {
    Approve(selectedTransaction.uid, 'reject', { rejection_reason: declineReason }, 'rent/admin');
      setStatsData((prev) => {
      const updatedResults = prev.rent.results.filter(
        (item) => item.uid !== selectedTransaction.uid
      );

      return {
        ...prev,
        rent: {
          ...prev.rent,
          results: updatedResults,
          count: prev.rent.count - 1,
        },
      };
    });
  }

  setShowModal(false);
  setSelectedTransaction(null);
  setDeclineReason('')

}


  



 
  console.log(statData?.rent?.results);
  // Sample data for the dashboard
  const stats = [
    {
      label: "Total Users",
      amount: statData?.users?.count ?? '0',
      bigStyle: true,
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round">


  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
  <circle cx="9" cy="7" r="4"/>

 
  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>

</svg>
      )
    },
    {
      label: "Apartment Total Amount",
      amount: '₦'+apartmentAmount?.toLocaleString(),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">


  <path d="M3 11l9-8 9 8"/>
  <path d="M5 10v10h14V10"/>
  <path d="M9 21v-6h6v6"/>

  <path d="M14 14h5"/>
  <path d="M14 17h5"/>

</svg>
      )
    },
    {
      label: "Pending Transaction Request",
      amount: statData?.transactions?.count ?? 0,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">


  <circle cx="12" cy="12" r="10"/>
  <path d="M12 6v6l4 2"/>


  <path d="M8 16h8"/>
</svg>
      )
    },
     
     {
      label: "Pending Loan Request",
      amount: statData?.loans?.count ?? 0,
      icon: (
      <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">


  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
  <path d="M14 2v6h6"/>


  <circle cx="12" cy="14" r="3"/>
  <path d="M12 13v1.5l1 1"/>

</svg>
      )
    },
    {
      label: "Total Apartment",
      amount: statData?.listings?.length,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">


  <rect x="3" y="3" width="18" height="18" rx="2"/>

  
  <path d="M7 7h2v2H7z"/>
  <path d="M11 7h2v2h-2z"/>
  <path d="M15 7h2v2h-2z"/>

  <path d="M7 11h2v2H7z"/>
  <path d="M11 11h2v2h-2z"/>
  <path d="M15 11h2v2h-2z"/>

  <path d="M7 15h2v2H7z"/>
  <path d="M11 15h2v2h-2z"/>
  <path d="M15 15h2v2h-2z"/>

</svg>
      )
    },
     {
      label: 'Pending Housing Request',
      amount: statData?.house?.length,
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">

 
  <path d="M3 11l9-8 9 8"/>
  <path d="M5 10v10h14V10"/>
  <path d="M9 21v-6h6v6"/>


  <circle cx="18" cy="18" r="3"/>
  <path d="M18 17v1.5l1 1"/>

</svg>
      )
    },
    
     {
      label: 'Pending Rent Request',
      amount: statData?.rent?.count,
      icon: (
       <svg xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round">

 
  <path d="M3 11l9-8 9 8"/>
  <path d="M5 10v10h14V10"/>

 
  <circle cx="9" cy="15" r="1"/>
  <circle cx="12" cy="15" r="1"/>
  <circle cx="15" cy="15" r="1"/>

</svg>
      )
    },
  ];
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigate('/adminlogin45');
      }, 3000);
      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <PopupMessage
        message='Session expired. You will be logged out soonest'
        title='Session expired'
        type='error'
        isOpen={isopen}
      />
    );
  }

  // ── LOADING SCREEN ── ADDED ──────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-cooperative-cream flex flex-col items-center justify-center gap-5">
        <div className="w-12 h-12 rounded-full border-4 border-cooperative-teal/20 border-t-cooperative-teal animate-spin" />
        <div className="text-center space-y-1">
          <p className="text-cooperative-dark font-semibold">Loading dashboard…</p>
          <p className="text-cooperative-dark/50 text-sm">Fetching your latest data</p>
        </div>
      </div>
    );
  }
  // ── END LOADING SCREEN ───────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-cooperative-cream p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cooperative-dark">Admin Dashboard</h1>
        <p className="text-cooperative-dark/60 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* First Row - Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {stats.map((stat, index) => (
          <AdminStatsCard
            key={index}
            label={stat.label}
            amount={stat.amount}
            bigStyle={stat.bigStyle || false}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>
      <div className='pt-[4rem]'>
        {getNovalue(paymentRequest) && <h2 className='text-2xl font-bold text-cooperative-dark mb-4'>Recent Transaction Request{transactionLength > 1 ? 's': ''}</h2>}
       
      </div>
       {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-[#003000] mb-4">
              {modalAction === 'accept' ? 'Accept Transaction' : 'Decline Transaction'}
            </h2>
            
            <p className="text-[#003000]/80 mb-4">
       {ActionBasedonType(activity, modalAction, selectedTransaction)}
            </p>

            {modalAction === 'decline' && (
              <div className="mb-4">
                <label className="block text-[#003000] text-sm font-medium mb-2">
                  Reason for declining (optional):
                </label>
                <textarea
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                  className="w-full px-3 py-2 border border-[#003000]/20 rounded-lg focus:outline-none focus:border-[#F57C00]"
                  rows="3"
                  placeholder="Enter reason for declining this transaction..."
                />
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={confirmAction}
                className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 ${
                  modalAction === 'accept'
                    ? 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Yes, {modalAction}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setDeclineReason('');
                }}
                className="flex-1 py-2 bg-gray-200 text-[#003000] rounded-lg hover:bg-gray-300 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

<Request 
  labels={{ type: 'transactions', title: 'Transfer Request', amountLabel: 'Transfer amount:' }}
  infoObj={paymentRequest}
  onAccept={(item, type) => handleAccept(item, type='transaction')}
  onPending={(item) => showReceipt(item)}
  onReject={(item, type) => handleReject(item, type = 'transaction')}
/>
{getNovalue(paymentRequest) ? <a className={`bg-cooperative-orange text-white font-bold h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[2rem] px-3 py-2 inline-block${transactionLength.length <= 3 ? 'hidden' : ''}`} href='/admin#transaction'>View all Pending Transactions</a>: <NoValue theValue = 'transaction'/>
}
<div className='pt-[4rem]'>
        {getNovalue(loanPendingRequest) && <h2 className='text-2xl font-bold text-cooperative-dark mb-4'>Recent loan Request{loanLength  > 1 ? 's': ''}</h2>}
       
      </div>
<Request 
  labels={{ type: 'loan', title: 'Loan Request', amountLabel: 'Principal' }}
  infoObj={loanPendingRequest}
  onAccept={(item, type) => handleAccept(item, type='loan')}
  onPending={(item) => console.log('Mark pending:', item)}
  onReject={(item, type) => handleReject(item, type = 'loan')}
/>

 {getNovalue(loanPendingRequest) ?  <a className={`bg-cooperative-orange text-white font-bold h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[2rem] px-3 py-2 inline-block  ' href='/admin#transaction ${loanLength <= 3 ? 'hidden' : ''}`}>View all Pending Loans </a>: <NoValue theValue = 'Loan'/>
} 

<div className='pt-[4rem]'>
        {getNovalue(loanPendingRequest) && <h2 className='text-2xl font-bold text-cooperative-dark mb-4'>Recent House Request{houseLength > 1 ? 's': ''}</h2>}
       
      </div>
<Request 
  labels={{ type: 'house', title: 'House Request', amountLabel: 'Price' }}
  infoObj={housePendingRequest}
  onAccept={(item, type) => handleAccept(item, type='house')}
  onPending={(item) => console.log('Mark pending:', item)}
  onReject={(item, type) => handleReject(item, type = 'house')}
/>

 {getNovalue(housePendingRequest) ?  <a className={`bg-cooperative-orange text-white font-bold h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[2rem] px-3 py-2 inline-block  ' href='/admin#transaction ${houseLength <= 3 ? 'hidden' : ''}`}>View all Pending house </a>: <NoValue theValue = 'House'/>
} 

<div className='pt-[4rem]'>
        {getNovalue(rentRequest) && <h2 className='text-2xl font-bold text-cooperative-dark mb-4'>Recent Rent Request{rentRequest.length > 1 ? 's': ''}</h2>}
       
      </div>
<Request 
  labels={{ type: 'rent', title: 'Rent Request', amountLabel: 'Price per day' }}
  infoObj={rentRequest}
  onAccept={(item, type) => handleAccept(item, type='rent')}
  onPending={(item) => console.log('Mark pending:', item)}
  onReject={(item, type) => handleReject(item, type = 'rent')}
/>

 {getNovalue(rentRequest) ?  <a className={`bg-cooperative-orange text-white font-bold h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[2rem] px-3 py-2 inline-block  ' href='/admin#rentRequest' ${rentLength <=3 ? 'hidden' : ''}`}>View all Rent requests </a>: <NoValue theValue = 'rent'/>
} 


{showReceiptModal && selectedTransaction?.payment_proof && <div className='fixed inset-0 z-[50] bg-black/80'>
<div className='flex flex-col justify-center items-center h-[100vh]'>
     <div className=' bg-white rounded-md h-[90vh] w-[90%] max-w-[600px]'>
      
      <div className='py-3 pr-4'><RiCloseCircleFill className='block ml-auto ' size={30} onClick={()=>{setShowReceiptModal(false)}}/></div>
      <div>
      <img src={selectedTransaction?.payment_proof
       ?.image_url} alt="receipt" className='rounded-sm h-full w-full object-contain'/>
       </div>
     
     </div>
     <div>
</div>
     </div>
  </div>
  }

{createPortal(<PopupMessage isOpen={open} message={messages} title={titles} type={types} onClose={()=>setOpen(false)}/>,document.body)}
    </div>
  );
};

export default AdminDashboard;