import React from 'react';
import { 
  RiWalletLine, 
  RiPlantLine, 
  RiBankLine, 
  RiBuildingLine,
  RiUserLine,
  RiMailLine,
  RiCalendarLine,
  RiMapPinLine,
  RiIdCardLine
} from "react-icons/ri";
import { TbGenderHermaphrodite } from "react-icons/tb";
import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PopupForm from '../ui/PopupForm';



const StatCard = ({ title, value, icon: Icon, color,  bgColor, textColor  }) => (
  <div className={`group relative overflow-hidden rounded-2xl  shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${bgColor} ${textColor}`}>
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${color}`} />
    <div className="relative p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <span className={`text-3xl font-bold ${textColor}`}>₦{value}</span>
      </div>
      <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
    </div>
  </div>
);

const ProfileItem = ({ icon: Icon, label, value}) => (
  <div className={`flex items-start space-x-3 p-3 rounded-xl  hover:bg-[#FDF6EC] transition-all duration-300 group`}>
    <div className="p-2 rounded-lg bg-[#FDF6EC] group-hover:bg-white transition-colors">
      <Icon size={16} className="text-[#2E7D32] group-hover:text-[#F57C00]" />
    </div>
    <div className="flex-1">
      <p className="text-xs text-[#2E7D32]">{label}</p>
      <p className="text-sm font-medium text-[#003000]">{value}</p>
    </div>
  </div>
);

const Dashboardmain = ({componentUserValue}) => {
  const [profileData, setProfileData] = useState({});
  const walletValue = componentUserValue.wallet;
 
  const userValue = componentUserValue.user;
  const profiles = userValue;
  const [isOpen, setOpen] = useState(false)
  const dateJoined = new Date(walletValue.created_on);
  const day = dateJoined.getDate();
  const {getAccessToken} = useAuth();
  const [form, setForm] = useState({});
  const [profile, setProfile] = useState({});
 const accessToken = getAccessToken();
  const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];


const formFields = [
  {
    name: 'account_name',
    label: 'Account Name',
    type: 'text',
    placeholder: 'Enter your account name',
    required: true
  },
  {
    name: 'account_number',
    label: 'Account Number',
    type: 'number',
    placeholder: 'Enter your account number',
    required: true
  },
  {
    name: 'address',
    label: 'address',
    type: 'text',
    placeholder: 'Enter your address',
    required: true
  },
  {
    name: 'bank_name',
    label: 'Bank Name',
    type: 'text',
    placeholder: 'Enter your bank name',
    required: true
  },
  {
    name: 'phone_number',
    label: 'Phone Number',
    type: 'tel',
    placeholder: 'Enter your phone number',
    required: true
  }
];

async function getUserProfile() {
  const token = getAccessToken();

  
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  setProfile(data)

if (!res.ok) {
    console.error(" BACKEND RESPONSE:", data); 
    console.error(" STATUS:", res.status);
    throw new Error(JSON.stringify(data));
  }
setProfileData(data)
  return data;
}

  
useEffect(() => {
  const fetchProfile = async () => {
   const profileSetUp = await getUserProfile();
    if(profileSetUp.account_number){setOpen(false)} else {setOpen(true)}
  };

  fetchProfile();
}, []);
 const refinedDateJoined = `${getOrdinalSuffix(day)} ${months[dateJoined.getMonth() + 1]}, ${dateJoined.getFullYear()}`;
const handleSubmit = async (data) => {
  try {
    const token = getAccessToken();

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("ERROR:", result);
      return;
    }

    console.log("SUCCESS:", result);
    setProfileData(result);
    setOpen(false)
  } catch (err) {
    console.error(" NETWORK ERROR:", err);
  }
};







  function getOrdinalSuffix(day) {
  // Convert to number just in case
  const d = Number(day);

  // Special cases for 11, 12, 13
  if (d % 100 >= 11 && d % 100 <= 13) {
    return d + "th";
  }

  // Normal suffixes
  switch (d % 10) {
    case 1:
      return d + "st";
    case 2:
      return d + "nd";
    case 3:
      return d + "rd";
    default:
      return d + "th";
  }
}




  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003000]">
          Wallet Dashboard
        </h1>
       
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <StatCard 
          title="Total Balance" 
          value= {Number(walletValue.balance).toLocaleString()} 
          icon={RiWalletLine}
          color="bg-[#F57C00]"
          bgColor = 'bg-[#003000]'
          textColor = 'text-[#FDF6EC]'
        />
        <StatCard 
          title="Total Deductible" 
          value="0.00" 
          icon={RiPlantLine}
          color="bg-[#2E7D32]"
          bgColor = ''
          textColor = ''
        />
      
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl bg-white shadow-lg p-6">
        <div className="flex items-center justify-between mb-6 max-small-screen:flex-col max-small-screen:items-start max-small-screen:gap-y-2">
          <h2 className="text-2xl font-bold text-[#003000] sm:text-[25px]">Profile Information</h2>
          <button className="px-4 py-2 text-sm bg-[#F57C00] hover:bg-[#F57C00]/80 text-white rounded-lg transition-all duration-300">
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <ProfileItem icon={RiUserLine} label="Full Name" value={profiles.full_name} />
          <ProfileItem icon={RiMailLine} label="Email" value={profiles.email} />
          <ProfileItem icon={RiIdCardLine} label="Membership ID" value={profiles.membership_id} />
          <ProfileItem icon={RiCalendarLine} label="Date Joined" value={refinedDateJoined} />
          <ProfileItem icon={RiBankLine} label="Account Number" value={profileData.account_number} />
          <ProfileItem icon={RiBuildingLine} label="Bank Name" value={profileData.bank_name} />
          <ProfileItem icon={RiMapPinLine} label="Location" value={profileData.address} />
          <ProfileItem icon={RiUserLine} label="Username" value={profiles.username} />
           <ProfileItem icon={RiUserLine} label="Account Name" value={profileData.account_name} />
        </div>
      </div>
     {createPortal(<div className=''><PopupForm  isOpen= {isOpen}
        onClose={() => setOpen(false)}
        formfield={formFields}
        title="Register"
        onSubmit={handleSubmit}
        submitLabel="Submit a detailed profile"/></div>, document.body)}
    </div>
  );
};

export default Dashboardmain;