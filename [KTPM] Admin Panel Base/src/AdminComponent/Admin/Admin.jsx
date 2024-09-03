import React, { useEffect } from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { User } from '../User/User'
import { useDispatch, useSelector } from 'react-redux'
import { CreateUserForm } from '../User/CreateUserForm'


export const Admin = () => {
    const dispatch = useDispatch()
    const handleClose = () => {
        console.log('close')
    }
    const jwt = localStorage.getItem('jwt')
    const {restaurant}=useSelector(state=>state)

    useEffect(() => {
        // dispatch(getRestaurantById({jwt, restaurantId:restaurant.usersRestaurant?.id }))
        // //dispatch(getRestaurantById())
        // //dispatch(getMenuItemsByRestaurantId())
        // dispatch(fetchRestaurantsOrder({jwt, restaurantId:restaurant.usersRestaurant?.id, orderStatus:'pending'}))
        // dispatch(getRestaurantsCategory({jwt, restaurantId:restaurant.usersRestaurant?.id }))
    
    }, [])
  return (
    <div className='lg:flex justify-between'>
        <div>
            <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className='lg:w-[85%]'>
            <Routes>
                <Route path='/dashboard' element={<User/>}/>
                <Route path='/user' element={<User/>}/>
                <Route path="/user/:register" element={<User />} />
                <Route path='/game' element={<User/>}/>
                <Route path='/create-user' element={<CreateUserForm/>}/>


            </Routes>
        </div>
        
    </div>
  )
}
