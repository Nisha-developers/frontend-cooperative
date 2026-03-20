import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'
import DashboardLayout from './components/layout/DashboardLayout'
import RentApartment from './components/landing/RentApartment'
import BuyApartment from './components/landing/BuyApartment'
import PopupForm from './components/ui/PopupForm'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <DashboardLayout /> 
       {/* <App />   */}
       {/* <PopupForm /> */}
       {/* <BuyApartment /> */}
        {/* <RentApartment />   */}
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
)
