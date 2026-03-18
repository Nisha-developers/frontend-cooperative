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
const profiles = {
  fullName: "Adenola Aishat",
  email: "aishatadebukola@gmail.com",
  membershipId: "MBR-2024-001",
  dateOfJoining: "January 15, 2024",
  accountNumber: "1234567890",
  bankName: "First Bank",
  accountName: "Adenola Aishat",
  location: "Lagos, Nigeria",
  username: "@aishat_a",
  gender: "Female"
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${color}`} />
    <div className="relative p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-500`}>
          <Icon size={24} className={color.replace('bg-', 'text-')} />
        </div>
        <span className="text-3xl font-bold text-[#003000]">₦0.00</span>
      </div>
      <h3 className="text-sm font-medium text-[#2E7D32]">{title}</h3>
    </div>
  </div>
);

const ProfileItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-[#FDF6EC] transition-all duration-300 group">
    <div className="p-2 rounded-lg bg-[#FDF6EC] group-hover:bg-white transition-colors">
      <Icon size={16} className="text-[#2E7D32] group-hover:text-[#F57C00]" />
    </div>
    <div className="flex-1">
      <p className="text-xs text-[#2E7D32]">{label}</p>
      <p className="text-sm font-medium text-[#003000]">{value}</p>
    </div>
  </div>
);

const Dashboardmain = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-[#003000]">
          Wallet Dashboard
        </h1>
        <div className="px-4 py-2 bg-white rounded-full border border-[#2E7D32]/20">
          <span className="text-sm text-[#2E7D32]">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Balance" 
          value="0.00" 
          icon={RiWalletLine}
          color="bg-[#F57C00]"
        />
        <StatCard 
          title="Agric Cooperative" 
          value="0.00" 
          icon={RiPlantLine}
          color="bg-[#2E7D32]"
        />
        <StatCard 
          title="Credit & Thrift" 
          value="0.00" 
          icon={RiBankLine}
          color="bg-[#F57C00]"
        />
        <StatCard 
          title="Housing Cooperative" 
          value="0.00" 
          icon={RiBuildingLine}
          color="bg-[#003000]"
        />
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl bg-white shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#003000]">Profile Information</h2>
          <button className="px-4 py-2 text-sm bg-[#F57C00] hover:bg-[#F57C00]/80 text-white rounded-lg transition-all duration-300">
            Edit Profile
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <ProfileItem icon={RiUserLine} label="Full Name" value={profiles.fullName} />
          <ProfileItem icon={RiMailLine} label="Email" value={profiles.email} />
          <ProfileItem icon={RiIdCardLine} label="Membership ID" value={profiles.membershipId} />
          <ProfileItem icon={RiCalendarLine} label="Date Joined" value={profiles.dateOfJoining} />
          <ProfileItem icon={RiBankLine} label="Account Number" value={profiles.accountNumber} />
          <ProfileItem icon={RiBuildingLine} label="Bank Name" value={profiles.bankName} />
          <ProfileItem icon={RiMapPinLine} label="Location" value={profiles.location} />
          <ProfileItem icon={RiUserLine} label="Username" value={profiles.username} />
          <ProfileItem icon={TbGenderHermaphrodite} label="Gender" value={profiles.gender} />
        </div>
      </div>
    </div>
  );
};

export default Dashboardmain;