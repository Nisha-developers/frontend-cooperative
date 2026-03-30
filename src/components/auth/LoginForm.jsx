import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../../components/ui/Spinner";
import { Navigate } from "react-router-dom";
import { createPortal } from "react-dom";
import PopupMessage from "../../components/ui/PopupMessage";

export default function Login() {
  const navigete = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('')
  const [error, seterror] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {login}  = useAuth();
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
           credentials: "include", 
          body: JSON.stringify({
            email: form.identifier,
            password: form.password,
          }),
        }
      );
      const data = await response.json();
       if (!response.ok) {
       setIsOpen(true);
       setMessage('Account not found. Please check your credentials and try again.');
       setTitle('Login Error');
       seterror('error')

        throw new Error(data.message || "Login failed");
      }
      let wallet = data.wallet;
      let user= data.user;
      const isUser = user.is_admin;
      if(!isUser){
        setLoading(true);
        setIsOpen(true);
        setMessage('This account belong to the user. Login to user and try again');
        setTitle('Login Error');
        seterror(error)
      }else{
       setLoading(true);
       setIsOpen(true);
       setMessage('Login successful! Redirecting to dashboard');
       setTitle('Login Success');
       seterror('success')
      let userDetails = {user, wallet};
      login(userDetails, data.access)
        setTimeout(()=>{
          setLoading(false);
          navigete('/admin');
        }, 4000)
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cooperative-cream via-cooperative-cream to-orange-50/30 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cooperative-orange/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cooperative-teal/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cooperative-dark/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Background texture - preserved your original but enhanced */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #2E7D3215 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, #F57C0010 0%, transparent 50%),
                            repeating-linear-gradient(45deg, #2E7D3205 0px, #2E7D3205 2px, transparent 2px, transparent 8px)`,
        }}
      />

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Header with enhanced animation */}
        <div className="mb-10 text-center transform transition-all duration-500 hover:scale-105">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cooperative-dark to-cooperative-teal mb-6 shadow-xl animate-float">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="10" r="5" fill="#F57C00" />
              <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#FDF6EC" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </div>
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-cooperative-dark to-cooperative-teal bg-clip-text text-transparent tracking-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
          >
            Welcome back
          </h1>
          <p className="mt-3 text-sm text-cooperative-dark/60 font-medium">
            Sign in to your cooperative account
          </p>
        </div>

        {/* Card with enhanced styling */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/30 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email / Username with improved interaction */}
            <div className="group">
              <label
                htmlFor="identifier"
                className="block text-xs font-bold text-cooperative-dark uppercase tracking-wider mb-2 transition-colors group-focus-within:text-cooperative-teal"
              >
                Email
              </label>
              <div
                className={`relative rounded-xl border-2 transition-all duration-300 ${
                  focused === "identifier"
                    ? "border-cooperative-teal shadow-lg shadow-cooperative-teal/20 scale-[1.02]"
                    : "border-gray-200 group-hover:border-gray-300"
                }`}
              >
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  focused === "identifier" ? "text-cooperative-teal scale-110" : "text-cooperative-dark/40"
                }`}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="identifier"
                  type="text"
                  placeholder="you@example.com"
                  value={form.identifier}
                  onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                  onFocus={() => setFocused("identifier")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-4 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none transition-all"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password with enhanced interaction */}
            <div className="group">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-cooperative-dark uppercase tracking-wider transition-colors group-focus-within:text-cooperative-teal"
                >
                  Password
                </label>
                <Link to='/forget-password'
                  type="button"
                  className="text-xs font-semibold text-cooperative-orange hover:text-cooperative-teal transition-all duration-300 hover:scale-105"
                >
                  Forgot password?
                </Link>
              </div>
              <div
                className={`relative rounded-xl border-2 transition-all duration-300 ${
                  focused === "password"
                    ? "border-cooperative-teal shadow-lg shadow-cooperative-teal/20 scale-[1.02]"
                    : "border-gray-200 group-hover:border-gray-300"
                }`}
              >
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                  focused === "password" ? "text-cooperative-teal scale-110" : "text-cooperative-dark/40"
                }`}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  className="w-full pl-11 pr-12 py-3.5 bg-transparent rounded-xl text-cooperative-dark placeholder-gray-400 text-sm font-medium outline-none"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-cooperative-dark/40 hover:text-cooperative-teal transition-all duration-300 hover:scale-110"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me with enhanced checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 rounded-md border-2 border-gray-300 peer-checked:bg-cooperative-teal peer-checked:border-cooperative-teal transition-all duration-300 group-hover:border-cooperative-teal/50" />
                <svg
                  className="absolute inset-0 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition-all duration-300 p-0.5 transform peer-checked:scale-100 scale-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-cooperative-dark/70 font-medium group-hover:text-cooperative-dark transition-all duration-300">
                Keep me signed in
              </span>
            </label>

            {/* Submit button with loading state */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-gradient-to-r from-cooperative-dark to-cooperative-teal text-cooperative-cream rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 mt-2 relative overflow-hidden ${
                loading ? "opacity-80 cursor-wait" : "hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Enhanced divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-cooperative-dark/50 text-xs font-medium">Secure Login</span>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-2 text-xs text-cooperative-dark/50">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Your data is encrypted and secure</span>
          </div>
        </div>

        {/* Sign up link with enhanced styling */}
        <p className="text-center mt-8 text-sm text-cooperative-dark/60 font-medium">
          Not a member yet?{" "}
          <Link
            to="/register"
            className="text-cooperative-orange font-bold hover:text-cooperative-teal transition-all duration-300 hover:underline decoration-2 underline-offset-2 inline-flex items-center gap-1 group"
          >
            Create an account
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </p>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
      {createPortal(<PopupMessage
      isOpen={isOpen}
      type={error}              
     title={title}
     message={message}
      onClose={() => setIsOpen(false)}
   />, document.body)}
    </div>
  );
}