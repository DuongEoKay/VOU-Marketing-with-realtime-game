import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Admin } from '../AdminComponent/Admin/Admin'
import { useSelector } from 'react-redux'

export const AdminRoute = () => {
    const {restaurant} = useSelector(state=>state)
  return (
    <div>
        <Routes>
            {/* <Route path='/*' element={false?<CreateRestaurantForm/>:<Admin/>}/> */}
            <Route path='/*' element={<Admin/>}/>
            

        </Routes>
    </div>
  )
}
