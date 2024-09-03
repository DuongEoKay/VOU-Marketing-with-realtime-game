import React from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Draw } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';


const menu=[
    {title:"Orders",icon:<ShoppingBagIcon/>},
    {title:"Favourite",icon:<FavoriteIcon/>},
    {title:"Address",icon:<HomeIcon/>},
    {title:"Logout",icon:<LogoutIcon/>}
]
export const ProfileNavigation = ({open, handleClose}) => {
    const isSmallScreen=useMediaQuery('(max-width:900px)')
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleNavigate=(item)=>{
        if(item.title==="Logout"){
            dispatch(logout())
            navigate('/')
        }
        else
        navigate(`/profile/${item.title.toLowerCase()}`)
    }
    

  return (
    <div >
        <Drawer variant={isSmallScreen?"temporary":"permanent"} onClose={handleClose} open={open} anchor='left' sx={{zIndex:1}}>
            <div className='w-[50vw] lg:w-[20vw] h-[100vh]  flex flex-col justify-center text-x1 gap-8 pt-16'>
                {menu.map((item,i)=><>
                    <div onClick={()=>handleNavigate(item)} className='flex px-5 items-center space-x-5 cursor-pointer'>
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {i!==menu.length-1 && <Divider/>}
                    </>)}

            </div>
        </Drawer>
    </div>
  )
}
