import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { SaleProvider } from '@/context/SaleContext';


// Public
import LandingPage from '@/pages/public/LandingPage'
import NotFoundPage from '@/pages/public/NotFoundPage'

// Auth
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

// User

import PaymentUploadPage from '@/pages/user/PaymentUploadPage'
import UserNotificationsPage from '@/pages/user/UserNotificationsPage'
import ProfileSection from '@/pages/user/ProfileSection'

// Admin
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import ManageApartmentsPage from '@/pages/admin/ManageApartmentsPage'
import AddEditApartmentPage from '@/pages/admin/AddEditApartmentPage'
import ViewBookingRequestsPage from '@/pages/admin/ViewBookingRequestsPage'
import ReviewPaymentsPage from '@/pages/admin/ReviewPaymentsPage'
import ManageUsersPage from '@/pages/admin/ManageUsersPage'

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

function App() {
 
  return (
    <AuthProvider>
      <NotificationProvider>
        <SaleProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/agric" element={<BethelAgriculturalBody />} />
        <Route path="/rent" element={<RentApartment />} />
         <Route path="/land" element={<LandSection/>} />
        <Route path="/buy" element={<BuyApartment />} />

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
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} />
         
        
          <Route path="/payment/:bookingId" element={<ProtectedRoute><PaymentUploadPage /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><UserNotificationsPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileSection /></ProtectedRoute>} />

          {/* Admin (protected + admin role) */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/apartments" element={<AdminRoute><ManageApartmentsPage /></AdminRoute>} />
          <Route path="/admin/apartments/new" element={<AdminRoute><AddEditApartmentPage /></AdminRoute>} />
          <Route path="/admin/apartments/edit/:id" element={<AdminRoute><AddEditApartmentPage /></AdminRoute>} />
          <Route path="/admin/bookings" element={<AdminRoute><ViewBookingRequestsPage /></AdminRoute>} />
          <Route path="/admin/payments" element={<AdminRoute><ReviewPaymentsPage /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><ManageUsersPage /></AdminRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </SaleProvider>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App
