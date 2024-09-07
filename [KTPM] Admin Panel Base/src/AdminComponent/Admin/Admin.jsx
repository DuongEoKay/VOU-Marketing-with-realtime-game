import React, { useEffect } from 'react'
import { AdminSideBar } from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import { User } from '../User/User'
import { useDispatch, useSelector } from 'react-redux'

import { Game } from '../Game/Game'


export const Admin = () => {
    const handleClose = () => {
        console.log('close')
    }
    const jwt = localStorage.getItem('jwt')


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
                <Route path="/user/:update" element={<User />} />
                <Route path='/game' element={<Game/>}/>
                <Route path="/game/:create" element={<Game />} />
                <Route path="/game/:update" element={<Game/>} />



            </Routes>
        </div>
        
    </div>
  )
}
