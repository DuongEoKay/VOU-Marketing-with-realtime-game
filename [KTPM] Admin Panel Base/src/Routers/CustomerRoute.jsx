import React from 'react'
import { Navbar } from '../component/Navbar/Navbar'
import { Home } from '../component/Home/Home'
import Profile from '../component/Profile/Profile'
import { Route, Routes } from 'react-router-dom'
import { Auth } from '../component/Auth/Auth'
import { PaymentSuccess } from '../component/Payment/PaymentSuccess'
import { PaymentCancel } from '../component/Payment/PaymentCancel'


export const CustomerRoute = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account/:register" element={<Home />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/payment/success/:id" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />

        </Routes>
        <Auth/>
    </div>
  )
}
