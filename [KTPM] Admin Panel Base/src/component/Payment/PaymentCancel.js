import React from 'react'
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
export const PaymentCancel = () => {
  const navigateToHome = () => {
    window.location.href = '/'
}
return (
<div className='min-h-screen px-5'>
    <div className='flex flex-col items-center justify-center h-screen'>
        <SmsFailedIcon  style={{fontSize: '100px'}} className='text-red-500 '/>
        <h1 className='text-2xl font-bold'>Payment Cancel</h1>
        <p className='text-lg text-gray-500'>Your payment has been canceled</p>
        <button onClick={navigateToHome} className='bg-red-500 text-white px-3 py-1 mt-5 rounded-md'>Go to Home</button>

    </div>
</div>
)
}
