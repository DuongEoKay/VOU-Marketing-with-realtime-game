import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { UserTable } from './UserTable';



export const User = () => {
  const [filterValue, setFilterValue] = React.useState('all')

  const handleFilter=(e)=>{
    setFilterValue(e.target.value)
  }
  return (
    <div className='px-2'>
      <UserTable/>
    </div>
  )
}
