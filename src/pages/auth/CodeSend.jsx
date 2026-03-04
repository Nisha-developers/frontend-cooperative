import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from '@/context/AuthContext';

const CodeSend = () => {
  const [verificationCode, setVerificationCode] = useState('');
     const location = useLocation();
       const navigate = useNavigate();
        const { login } = useAuth();
     const email = location.state?.email;
     console.log(email);
    const handleResendCode = async () => {
  console.log('I am clicked')
  try {
    const response =await fetch(`${import.meta.env.VITE_API_URL}/api/users/resend-code/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email, 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to resend code");
    }

    alert("Verification code resent successfully ");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong while resending code ");
  }
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/verify-code/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          code: verificationCode, 
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('user has already signed in', data);
        login(
    { id: data.user_id, email },  // or any user info returned
    data.access,                  // access token
    data.refresh                  // refresh token
  );

      navigate('/dashboard');
    } else {
      console.log("Verification failed", data);
      alert(data.message || "Invalid code");
    }

  } catch (error) {
    console.error("Error verifying code:", error);
    alert("Something went wrong. Check your backend.");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF6EC] p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#003000] mb-2">
          Enter Verification Code
        </h2>
        
        <p className="text-center text-[#2E7D32] mb-6">
          Please enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength="6"
              className="w-full px-4 py-3 text-center text-lg tracking-widest
                       bg-[#FDF6EC] border-2 border-gray-200 rounded-lg
                       text-[#003000] placeholder-gray-400
                       focus:border-[#F57C00] focus:outline-none
                       transition-colors duration-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#F57C00] hover:bg-[#2E7D32]
                     text-white font-medium rounded-lg
                     transition-colors duration-200"
          >
            Verify Code
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            className="text-[#F57C00] hover:text-[#2E7D32] text-sm 
                     transition-colors duration-200 bg-transparent border-none"
          onClick={handleResendCode}>
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeSend;