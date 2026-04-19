import React, { useEffect, useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  Save,
  Download,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RiAccountCircleFill, RiAccountPinBoxFill } from 'react-icons/ri';
import { createPortal } from 'react-dom';
import PopupMessage from '../../components/ui/PopupMessage';


const Settings = () => {
  const [saved, setSaved] = useState(false);
  const {user, getAccessToken} = useAuth();
  const [editMode, setEditMode] = useState(true)
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('')
  const [open, setOpen] = useState('');
  const [profile, setProfile] = useState({
    fullName: user?.user?.full_name,
    email: user?.user?.email,
    phone: user?.profile?.phone_number,
    address: user?.profile?.address,
    userName: user?.user?.username,
    nextOfKin: user.next?? 'Nil',
    nextOfKinPhone: user.next ?? 'Nil',
    accountName: user?.profile?.account_name,
    accountNumber: user?.profile?.account_number,
    bankName: user?.profile?.bank_name
  });
 






   


  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };
  const handleEditForm = () =>{
    console.log('The form is edited')
    setEditMode(false);
    setOpen(true);
    setTitle('Editing Enabled');
    setMessage('You can make changes to your information. Make sure you save the changes when you are done');
    setType('success');

  }

  const handleSave =  async() => {
     setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    const token = getAccessToken();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        full_name: profile.fullName,
        email: profile.email,
        phone_number: profile.phone,
        address: profile.address,
        account_name: profile.accountName,
        account_number: profile.accountNumber,
        bank_name: profile.bankName
      })
})

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error(data?.message || 'Update failed');
    }

    setSaved(true);
    setEditMode(true);

    setTitle('Success');
    setMessage('Profile updated successfully');
    setType('success');
    setOpen(true);

    setTimeout(() => setSaved(false), 2500);

  } catch (err) {
    console.error(err);

    setTitle('Error');
    setMessage(err.message || 'Something went wrong');
    setType('error');
    setOpen(true);
  }
  

};
   

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-cooperative-dark">Profile Settings</h1>
          <p className="text-cooperative-dark/70 mt-2">Manage your personal information</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2 ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-cooperative-orange text-white hover:bg-cooperative-orange/90'
            }`}
          >
            {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
          <button
            onClick={handleEditForm}
            className='px-4 py-2 rounded-lg transition-all font-medium flex items-center gap-2 border-green-600 border-[1px] duration-300 hover:bg-green-600 hover:text-white'>
             Edit Profile
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
        {/* Profile Picture */}
       

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-cooperative-dark mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  readOnly ={editMode}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="email"
                  value={profile.email}
                  readOnly ={editMode}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="tel"
                  readOnly ={editMode}
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Username</label>
              <div className="relative">
                <User  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  readOnly ={editMode}
                  value={profile.userName}
                  onChange={(e) => handleProfileChange('userName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  readOnly ={editMode}
                  value={profile.address}
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Next of Kin */}
        <div className="pt-6 border-t border-cooperative-dark/10">
          <h3 className="text-lg font-semibold text-cooperative-dark mb-4">Next of Kin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Full Name</label>
              <input
                type="text"
                disabled
                value={profile.nextOfKin}
                onChange={(e) => handleProfileChange('nextOfKin', e.target.value)}
                className="w-full px-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Phone Number</label>
              <input
                type="tel"
                disabled
                value={profile.nextOfKinPhone}
                onChange={(e) => handleProfileChange('nextOfKinPhone', e.target.value)}
                className="w-full px-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="pt-6 border-t border-cooperative-dark/10">
          <h3 className="text-lg font-semibold text-cooperative-dark mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Account Name</label>
              <div className="relative">
                <RiAccountPinBoxFill className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  readOnly ={editMode}
                  value={profile.accountName}
                  onChange={(e) => handleProfileChange('accountName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl bg-cooperative-cream/50 text-cooperative-dark/70"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Account Number</label>
              <div className="relative">
                <RiAccountCircleFill className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  readOnly ={editMode}
                  value={profile.accountNumber}
                  onChange={(e) => handleProfileChange('accountNumber', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl bg-cooperative-cream/50 text-cooperative-dark/70"
                />
              </div>
              
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Bank Name</label>
              <div className="relative">
                <RiAccountCircleFill className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  readOnly ={editMode}
                  value={profile.bankName}
                  onChange={(e) => handleProfileChange('bankName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl bg-cooperative-cream/50 text-cooperative-dark/70"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
      {
        createPortal(<PopupMessage message={message} title={title} type={type} isOpen={open} onClose={()=>setOpen(false)}/>,document.body)
      }
    </div>
  );
};

export default Settings;