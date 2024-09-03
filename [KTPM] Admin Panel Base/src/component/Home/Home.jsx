import React, { useEffect } from 'react'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'



export const Home = () => {

  const dispatch = useDispatch()
  const jwt = localStorage.getItem('jwt')


 



  return (
    <div className='pb-10'>
      <section className='banner -z-50 relative flex flex-col justify-center'>

        <div className='w-[50vw] z-10 text-center'>
          <p className='text-2x1 lg:text-6x1 font-bold z-10 py-5'> VOU project</p>
          <p className='z-10 text-gray-300 text-xl lg:text-4x1'>admin panel by Van Duong</p>


        </div>
        <div className='cover absolute top-0 left-0 right-0'>


        </div>

        <div className='fadout'>
        </div>
      </section>




    </div>
  )
}
