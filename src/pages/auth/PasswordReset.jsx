import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);          // ← ADDED
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ← ADDED
  const navigate = useNavigate();
  const resetToken = localStorage.getItem('resetToken');
  const {refreshAccessToken} = useAuth();
 

 
   


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
        setTimeout(() => navigate('/login'), 1500); 
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
          {/* ── ADDED relative wrapper + eye button ── */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-3 py-3 pr-11 border-2 rounded-lg text-base transition-all duration-300 outline-none focus:border-[#F57C00] ${
                message && !isValid && password ? 'border-[#F57C00]' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003000] transition-colors"
            >
              {showPassword ? (
                // eye-off
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                // eye
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-[#003000] mb-2 font-medium">
            Confirm Password
          </label>
          {/* ── ADDED relative wrapper + eye button ── */}
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-3 pr-11 border-2 rounded-lg text-base transition-all duration-300 outline-none focus:border-[#F57C00] ${
                message && !isValid && confirmPassword ? 'border-[#F57C00]' : 'border-gray-200'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#003000] transition-colors"
            >
              {showConfirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
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