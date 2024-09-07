import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Dashboard } from '@mui/icons-material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import zIndex from '@mui/material/styles/zIndex';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
import PersonIcon from '@mui/icons-material/Person';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import BarChartIcon from '@mui/icons-material/BarChart';



const menu = [
    { name: 'Dashboard', icon: <BarChartIcon />, link: '/dashboard' },
    { name: 'User', icon: <PersonIcon />, link: '/user' },
    { name: 'Game', icon: <VideogameAssetIcon />, link: '/game' },
    { name: 'Logout', icon: <LogoutIcon />, link: '/' },
]


export const AdminSideBar = ({handleClose}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleNavigate=(item)=>{
        if(item.name==="Logout"){
            dispatch(logout())
            navigate('/')
        }
        else
        navigate(`/admin${item.link}`)
    }
    
    const isSmallScreen = useMediaQuery('(max-width:1080px)')
    return (
        <Drawer variant={isSmallScreen?"temporary":"permanent"} onClose={handleClose} open={true} anchor='left' sx={{zIndex:1}}>
            <div className='w-[50vw] lg:w-[15vw] h-[100vh]  flex flex-col justify-center text-x1 gap-8 pt-16'>
                {menu.map((item,i)=><>
                    <div onClick={()=>handleNavigate(item)} className='flex px-5 items-center space-x-5 cursor-pointer'>
                        {item.icon}
                        <span>{item.name}</span>
                    </div>
                    {i!==menu.length-1 && <Divider/>}
                    </>)}

            </div>
        </Drawer>
    )
}
