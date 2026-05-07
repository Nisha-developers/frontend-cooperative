import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'

import { SaleProvider } from '@/context/SaleContext';


// Public
import LandingPage from '@/pages/public/LandingPage'
import NotFoundPage from '@/pages/public/NotFoundPage'

// Auth
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

// User



// Admin
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'





import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminRoute from '@/components/auth/AdminRoute'
import CodeSend from './pages/auth/CodeSend'
import BethelAgriculturalBody from '@/pages/public/BethelAgriculturalBody'
import RentApartment from './components/landing/RentApartment'
import LandSection from './components/landing/LandSection';
import BuyApartment from './components/landing/BuyApartment'
import DashboardLayout from './components/layout/DashboardLayout'
import ForgetPassword from './pages/auth/ForgetPassword'
import VerifyPassword from './pages/auth/VerifyPassword'
import PasswordReset from './pages/auth/PasswordReset'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import CodeSenda from './components/auth/CodeSenda'
import ForgetPassworda from './components/auth/ForgetPassworda'
import VerifyPassworda from './components/auth/VerifyPassworda'
import ResetPassworda from './components/auth/ResetPassworda'
import HousingCooperativeBody from './pages/public/HousingCooperativeBody';
import CreditAndThriftBody from './pages/public/CreditAndThriftBody';
import { PurchaseProvider } from './context/PurchaseProvider';
import { RentProvider } from './context/RentProvider';


function App() {
 
  return (
    <AuthProvider>
        <SaleProvider>
          <PurchaseProvider >
            <RentProvider >
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/agric" element={<BethelAgriculturalBody />} />
        <Route path="/rentApartment" element={<RentApartment />} />
         <Route path="/buyLand" element={<LandSection/>} />
        <Route path="/buyApartment" element={<BuyApartment />} />
         <Route path="/housinCoop" element={<HousingCooperativeBody />} />
         <Route path="/credit" element={<CreditAndThriftBody/>} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
           <Route path="/code-send" element={<CodeSend />} />
           <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/verify-forget-password" element={<VerifyPassword />} />
             <Route path="/reset-password" element={<PasswordReset />} />
             {/* Admin login session begins */}
           <Route path="/adminlogin45" element={<LoginForm />} />
          <Route path="/adminregister45" element={<RegisterForm />} />
           <Route path="/admincode-send45" element={<CodeSenda />} />
           <Route path="/adminforget-password45" element={<ForgetPassworda />} />
            <Route path="/adminverify-forget-password45" element={<VerifyPassworda />} />
             <Route path="/adminreset-password45" element={<ResetPassworda />} />
             {/* Admin login session ends */}

          {/* User (protected) */}
          <Route path="/user" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />

         
        
          


          {/* Admin (protected + admin role) */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
         
         
         
         
       
        

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </RentProvider>
        </PurchaseProvider>
        </SaleProvider>
     
    </AuthProvider>
  )
}

export default App
