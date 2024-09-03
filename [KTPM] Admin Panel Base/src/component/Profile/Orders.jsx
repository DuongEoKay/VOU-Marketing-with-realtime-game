import React, { useEffect } from 'react'
import { OrderCard } from './OrderCard'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Orders = () => {
  const { auth, cart, order} = useSelector(state => state)
  const navigate = useNavigate()
  const jwt = localStorage.getItem('jwt')
  const dispatch = useDispatch()



  return (
    <div className='flex items-center flex-col'>
      <h1 className='text-x1 text-center py-7 font-semibold'>My Orders</h1>
      <div className='space-y-5 w-full lg:w-1/2'>
        {
          order.orders.map((order)=>order.items.map((item)=><OrderCard item={item} order={order}/>))
        }
      </div>
    </div>
  )
}

export default Orders