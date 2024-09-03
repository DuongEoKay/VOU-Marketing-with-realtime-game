import React from 'react'
import CreditScoreIcon from '@mui/icons-material/CreditScore';

export const PaymentSuccess = () => {
    const navigateToHome = () => {
        window.location.href = '/'
    }
  return (
    <div className='min-h-screen px-5'>
        <div className='flex flex-col items-center justify-center h-screen'>
            <CreditScoreIcon  style={{fontSize: '100px'}} className='text-green-500 '/>
            <h1 className='text-2xl font-bold'>Payment Successful</h1>
            <p className='text-lg text-gray-500'>Thank you for choosing our restaurant, have a good meal !!!</p>
            <button onClick={navigateToHome} className='bg-green-500 text-white px-3 py-1 mt-5 rounded-md'>Go to Home</button>

        </div>
    </div>
  )
}
