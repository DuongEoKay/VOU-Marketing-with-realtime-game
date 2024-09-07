import { Avatar, Badge, Box, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'



import './Navbar.css'
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../Auth/Auth';
import { useDispatch, useSelector } from 'react-redux';


export const Navbar = () => {
    const { auth } = useSelector(state => state)
    const token = localStorage.getItem('jwt')

    const navigate = useNavigate()
    const handleAvatarClick = () => {
        if (auth.user.role === 'ROLE_CUSTOMER') {
            navigate('/profile')
        }
        if (auth.user.role === 'ROLE_RESTAURANT_OWNER') {
            navigate('/admin/restaurant/dashboard')
        }
    }
    const handleLogoClick = () => {
        navigate('/admin')
    }








    const dispatch = useDispatch();


    return (




        <div>
            <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#000000] lg:px-20 flex justify-between backdrop-blur-md'>



                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li onClick={handleLogoClick} className='logo font-semibold text-gray-300 text-2xl'>
                        VOU Admin Panel
                    </li>
                </div>
                <div className='flex items-center space-x-2 lg:space-x-10'>


                    <div className=''>
                        {auth.user ? <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: 'black' }}>{auth.user?.fullName[0]?.toUpperCase()}

                        </Avatar> :
                            <IconButton onClick={() => { navigate('/account/login') }} >
                                <Person />
                            </IconButton>}


                    </div>





                </div>
            </Box>


        </div>


    )
}
