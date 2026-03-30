import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const VerifyPassword = () => {
    const location = useLocation();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const email = location.state?.email;
  console.log(email);
  const navigate  = useNavigate();
  

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

const handleVerify = async () => {
  const code = verificationCode.join('');

  if (code.length !== 6) {
    setMessage('Please enter the complete 6-digit verification code');
    setIsValid(false);
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/forgot-password/verify/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,      
          code: code,
        }),
      }
    );

    const data = await response.json();
    const resetToken = data?.reset_token;
    

    if (response.ok) {
      setMessage('✓ Verification successful! Code is valid.');
      localStorage.setItem('resetToken', resetToken);
      setIsValid(true);
      

       navigate('/adminreset-password45', {
        state: {resetToken } 
      });
    }
 else {
      setMessage(data?.message || 'Invalid verification code. Please try again.');
      setIsValid(false);
    }
  } catch (error) {
    setMessage('✗ Network error. Please check your connection and try again.');
    setIsValid(false);
  }
};

  const handleResendCode = () => {
    setMessage('New verification code has been sent to your email');
    setIsValid(false);
    setVerificationCode(['', '', '', '', '', '']);
    // Focus first input
    document.getElementById('code-input-0')?.focus();
  };

  return (
    <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center p-5">
      <div className="bg-white rounded-xl p-10 max-w-md w-full shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#FDF6EC] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#F57C00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6-4h12a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2zm10-4V6a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-[#2E7D32] text-2xl font-semibold mb-2">
            Verify Your Identity
          </h2>
          <p className="text-[#003000] text-sm">
            Please enter the 6-digit verification code sent to your email
          </p>
        </div>
        
        <div className="mb-8">
          <label className="block text-[#003000] mb-3 text-center font-medium">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`code-input-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-semibold border-2 rounded-lg transition-all duration-200 outline-none focus:border-[#F57C00] focus:ring-2 focus:ring-[#F57C00]/20 text-[#003000] bg-white"
                style={{
                  borderColor: message && !isValid && digit ? '#F57C00' : '#E5E7EB'
                }}
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-[#F57C00] text-white rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:bg-[#E06E00] active:scale-95 mb-4"
        >
          Verify Code
        </button>
        
        {message && (
          <div className={`p-3 rounded-lg text-center font-medium mb-4 ${
            isValid ? 'bg-green-50 text-[#2E7D32]' : 'bg-red-50 text-[#F57C00]'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyPassword;