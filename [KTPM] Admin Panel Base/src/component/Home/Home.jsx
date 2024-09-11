import React, { useEffect } from 'react'
//import './Home.css'
import { useDispatch, useSelector } from 'react-redux'



export const Home = () => {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')


 



  return (
    <div >
        <div className='w-full '>
          <img className='bg-cover h-full' src="https://res.cloudinary.com/dxsvumas8/image/upload/fl_preserve_transparency/v1713481881/FSPHOTO__486_of_486__Original_qhrwmy.jpg?_s=public-apps" alt="" />
        </div>
    </div>
  )
}
