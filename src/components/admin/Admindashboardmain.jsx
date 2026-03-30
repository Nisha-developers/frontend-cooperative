import React from 'react';
import AdminStatsCard from './AdminStatsCard';
   
import Request from './Request';
const AdminDashboard = () => {
  // Sample data for the dashboard
  const stats = [
    {
      label: "Company Balance",
      amount: "$45,678",
      change: "+23% increase",
      bigStyle: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        </svg>
      )
    },
    {
      label: "Total Users",
      amount: "1,200",
      change: "+12% from last month",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="9" r="3" fill="currentColor"/>
          <path d="M6 18c0-2.5 3-4 6-4s6 1.5 6 4" fill="currentColor"/>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        </svg>
      )
    },
    {
      label: "Total Income",
      amount: "$45,678",
      change: "+23% increase",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        </svg>
      )
    },
     
     {
      label: "Total Loan disbursed",
      amount: "$45,678",
      change: "+23% increase",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2"/>
        </svg>
      )
    },
    {
      label: "Active Booking Request",
      amount: "342",
      change: "12 pending request",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      label: "Total Apartment",
      amount: "847",
      change: "+32 new this week",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="14" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 7V5h8v2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="13" r="2" fill="currentColor"/>
        </svg>
      )
    },
   
     {
      label: "Active Loan Request",
      amount: "23",
      change: "Pending Request",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
    {
      label: "Pending Approved Payment",
      amount: "23",
      change: "Pending Request",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      )
    },
  ];
const loanRequest = [
    {userName: 'John Dolapo', amount: '$5,000', status: 'Pending'},
    {userName: 'Jane Smith', amount: '$10,000', status: 'Pending'},
  
]
   const paymentRequests = [
  {
    id: 1,
    userName: "David Brown",
    payerName: "David Brown",
    paymentAmount: 30000,
    paymentMethod: "Bank Transfer",
    referenceNumber: "PAY123456",
    status: "pending",
    date: "2026-03-29"
  },
  {
    id: 2,
    userName: "Emily Davis",
    paymentAmount: 75000,
    paymentMethod: "Card",
    referenceNumber: "PAY789101",
    status: "accepted",
    date: "2026-03-26"
  }
];
 
const loanRequests = [
  {
    id: 1,
    userName: "Michael Smith",
    amount: 50000,
    tenure: 12,
    interestRate: 5,
    status: "pending",
    date: "2026-03-25"
  },
  {
    id: 2,
    userName: "Sarah Williams",
    amount: 150000,
    tenure: 24,
    interestRate: 7,
    status: "rejected",
    date: "2026-03-20"
  }
];
const houseRequests = [
  {
    id: 1,
    userName: "John Doe",
    buyerName: "John Doe",
    price: 250000,
    propertyType: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    location: "Lagos, Nigeria",
    status: "pending",
    date: "2026-03-28"
  },
  {
    id: 2,
    renterName: "Mary Johnson",
    price: 120000,
    propertyType: "Duplex",
    bedrooms: 4,
    bathrooms: 3,
    location: "Abuja, Nigeria",
    status: "accepted",
    date: "2026-03-27"
  }
];
  return (
    <div className="min-h-screen bg-cooperative-cream p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cooperative-dark">Admin Dashboard</h1>
        <p className="text-cooperative-dark/60 mt-2">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* First Row - Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
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
        <h1 className='text-4xl font-bold max-sm:text-[20px] pb-[1rem]'>Pending Loan Request</h1>
       
      </div>

<Request 
  labels={{ type: 'loan', title: 'Loan Request', amountLabel: 'Loan amount:' }}
  infoObj={loanRequests}
  onAccept={(item) => console.log('Accept loan:', item)}
  onPending={(item) => console.log('Mark pending:', item)}
  onReject={(item) => console.log('Reject loan:', item)}
/>
<div className='bg-cooperative-orange text-white font-bold w-[200px] flex items-center justify-center h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[1rem]'>View all loan Request</div>

<Request 
  labels={{ type: 'house', title: 'Property Request', amountLabel: 'Price:' }}
  infoObj={houseRequests}
  onAccept={(item) => console.log('Accept property:', item)}
  onPending={(item) => console.log('Mark pending:', item)}
  onReject={(item) => console.log('Reject property:', item)}
/>
<div className='bg-cooperative-orange text-white font-bold w-[200px] flex items-center justify-center h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[1rem]'>View all house Request</div>


<Request 
  labels={{ type: 'payment', title: 'Payment Approval', amountLabel: 'Amount:' }}
  infoObj={paymentRequests}
  onAccept={(item) => console.log('Approve payment:', item)}
  onPending={(item) => console.log('Hold payment:', item)}
  onReject={(item) => console.log('Reject payment:', item)}
/>
<div className='bg-cooperative-orange text-white font-bold w-[200px] flex items-center justify-center h-[40px] rounded-md hover:bg-orange-800 duration-150 mb-[2rem] mt-[1rem]'>View all Payment request</div>
    </div>
  );
};

export default AdminDashboard;