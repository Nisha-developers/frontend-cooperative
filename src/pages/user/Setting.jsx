import React, { useState } from 'react';
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

const Settings = () => {
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    address: '12, Lekki Phase 1, Lagos, Nigeria',
    dateOfBirth: '1990-05-15',
    occupation: 'Software Engineer',
    nextOfKin: 'Jane Doe',
    nextOfKinPhone: '+234 802 345 6789',
    bio: 'Passionate about cooperative development and community growth.',
    joinedDate: 'January 2023'
  });

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
          <button className="px-4 py-2 border border-cooperative-teal text-cooperative-teal rounded-lg hover:bg-cooperative-teal/5 transition-colors font-medium flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
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
                  value={profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Date of Birth</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
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
                  value={profile.address}
                  onChange={(e) => handleProfileChange('address', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Occupation</label>
              <input
                type="text"
                value={profile.occupation}
                onChange={(e) => handleProfileChange('occupation', e.target.value)}
                className="w-full px-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Bio</label>
              <textarea
                rows="3"
                value={profile.bio}
                onChange={(e) => handleProfileChange('bio', e.target.value)}
                className="w-full px-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              />
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
                value={profile.nextOfKin}
                onChange={(e) => handleProfileChange('nextOfKin', e.target.value)}
                className="w-full px-4 py-3 border border-cooperative-dark/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cooperative-orange/20"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Phone Number</label>
              <input
                type="tel"
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
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Member Since</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  value={profile.joinedDate}
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl bg-cooperative-cream/50 text-cooperative-dark/70"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-cooperative-dark mb-2 block">Member ID</label>
              <div className="relative">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cooperative-dark/40" />
                <input
                  type="text"
                  value="COOP-2023-0842"
                  disabled
                  className="w-full pl-10 pr-4 py-3 border border-cooperative-dark/10 rounded-xl bg-cooperative-cream/50 text-cooperative-dark/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;