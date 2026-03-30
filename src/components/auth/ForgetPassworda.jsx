// ForgotPassword.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const {logout} = useAuth;
  

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Clear previous message
  setMessage({ type: '', text: '' });

  // Validate email
  if (!email.trim()) {
    setMessage({ type: 'error', text: 'Please enter your email address.' });
    return;
  }

  if (!validateEmail(email)) {
    setMessage({ type: 'error', text: 'Please enter a valid email address (e.g., name@cooperative.com).' });
    return;
  }

  setIsLoading(true);

  try {

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/forgot-password/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Request failed');
    }
console.log(typeof(logout))
    setMessage({
      type: 'success',
      text: ` Great! we have sent a code to your email. Check your inbox and set a new password`,
    });
   setEmail('');
setIsLoading(true);


// Wait 3 seconds, then navigate
setTimeout(() => {
  setIsLoading(false);
 navigate('/adminverify-forget-password45', {
  state: { email }
});
}, 3000);
    

  } catch (error) {
    console.log(error);
    setMessage({
      type: 'error',
      text: 'Unable to process request. Please try again.',
      
    });
  }
};


 

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 bg-cooperative-cream">
      <div className="w-full max-w-md mx-auto relative">
        {/* Decorative background elements */}
        <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-cooperative-teal opacity-5  pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-6 w-32 h-32 rounded-full bg-cooperative-orange opacity-10  pointer-events-none"></div>
        
        {/* Main Card */}
        <div className="bg-cooperative-cream rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-cooperative-teal/10 overflow-hidden">
          
          {/* Header Section */}
          <div className="px-6 pt-8 pb-4 text-center relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cooperative-teal/10 mb-4 shadow-sm">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 text-cooperative-teal" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="1.8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 21v-3.75a4.5 4.5 0 00-4.5-4.5h-6a4.5 4.5 0 00-4.5 4.5V21" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-cooperative-dark">
              Forgot password?
            </h1>
          </div>
          
          {/* Decorative Divider */}
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-cooperative-orange to-cooperative-teal mb-4"></div>
          
          {/* Form Section */}
          <div className="px-6 pb-8 pt-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input Field */}
              <div className="space-y-1">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold tracking-wide text-cooperative-dark"
                >
                  Registered email address
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-cooperative-teal/60" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth="1.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-cooperative-dark placeholder:text-cooperative-dark/40 focus:ring-2 focus:ring-cooperative-orange/60 focus:border-cooperative-orange transition-all duration-200"
                    placeholder="you@cooperative.com"
                    style={{ borderColor: '#E2E8F0' }}
                    disabled={isLoading}
                  />
                </div>
                <p className="text-xs mt-1 text-cooperative-teal/70">
                  We'll send a reset link to this email.
                </p>
              </div>
              
              {/* Message Display */}
              {message.text && (
                <div 
                  className={`mt-4 p-3 rounded-xl border-l-4 text-sm animate-[softRise_0.5s_ease_forwards] ${
                    message.type === 'success' 
                      ? 'bg-green-50 border-l-cooperative-teal text-cooperative-dark' 
                      : 'bg-orange-50 border-l-cooperative-orange text-cooperative-orange'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'success' ? (
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-cooperative-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-cooperative-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    )}
                    <div className="font-medium">{message.text}</div>
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cooperative-orange disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#F57C00' }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818L9.47 9.47c.404-.404.527-1 .43-1.563A6 6 0 0116.5 4.5h.75a3 3 0 013 3z" />
                    </svg>
                    Send reset link
                  </>
                )}
              </button>
            </form>
            
            {/* Back to Login Link */}
            <div className="mt-8 text-center">
              <button
                className="inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 group text-cooperative-teal hover:text-cooperative-orange"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span> <Link to='/login'>Back to sign in</Link>  </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer Note */}
        <div className="text-center mt-6 text-xs opacity-60 text-cooperative-dark">
          Cooperative Financial Network • Secure recovery
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;