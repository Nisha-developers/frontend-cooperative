import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const resetToken = localStorage.getItem('resetToken');
  console.log(resetToken);
  const handleVerify = async () => {
    if (!password || !confirmPassword) {
      setMessage('Please enter both password fields');
      setIsValid(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('✗ Passwords do not match');
      setIsValid(false);
      return;
    }

    if (!resetToken) {
      setMessage('✗ Reset token is missing. Please restart the reset process.');
      setIsValid(false);
      return;
    }

    try {
     const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/users/forgot-password/reset/`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${resetToken}`,
    },
    body: JSON.stringify({
      new_password: password,
      confirm_password: confirmPassword,
    }),
  }
);

      const data = await response.json();

      if (response.ok) {
        setMessage('✓ Password reset successful!');
        setIsValid(true);
        localStorage.removeItem('resetToken');
        setTimeout(() => navigate('/adminlogin45'), 1500); 
      } else {
        setMessage(data?.message || '✗ Password reset failed. Please try again.');
        setIsValid(false);
      }
    } catch (error) {
      setMessage('✗ Network error. Please check your connection and try again.');
      setIsValid(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-5">
      <div className="bg-white rounded-xl p-10 max-w-md w-full shadow-lg">
        <h2 className="text-[#2E7D32] text-3xl font-semibold mb-6 text-center">
          Verify Password
        </h2>
        
        <div className="mb-5">
          <label className="block text-[#003000] mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-3 border-2 rounded-lg text-base transition-all duration-300 outline-none focus:border-[#F57C00] ${
              message && !isValid && password ? 'border-[#F57C00]' : 'border-gray-200'
            }`}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-[#003000] mb-2 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-3 py-3 border-2 rounded-lg text-base transition-all duration-300 outline-none focus:border-[#F57C00] ${
              message && !isValid && confirmPassword ? 'border-[#F57C00]' : 'border-gray-200'
            }`}
          />
        </div>
        
        <button
          onClick={handleVerify}
          className="w-full py-3.5 bg-[#F57C00] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-[#E06E00] active:scale-98 mb-4"
        >
          Verify Password
        </button>
        
        {message && (
          <div className={`p-3 rounded-lg text-center font-medium ${
            isValid ? 'bg-green-50 text-[#2E7D32]' : 'bg-red-50 text-[#F57C00]'
          }`}>
            {message}
          </div>
        )}
        
      
      </div>
    </div>
  );
};

export default PasswordReset;