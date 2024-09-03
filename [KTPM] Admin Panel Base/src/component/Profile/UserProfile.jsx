import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';


const UserProfile = () => {
  const dispatch = useDispatch()
  const auth=useSelector(state=>state.auth)

  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
        <div className='flex flex-col items-center justify-center'>
            <AccountCircleIcon sx={{fontSize:'10rem'}}/>
            <h1 className='text-3xl font-semibold py-5'>{auth.user.fullName}</h1>
            <p>Email: {auth.user.email}</p>
        </div>
    </div>
  )
}

export default UserProfile