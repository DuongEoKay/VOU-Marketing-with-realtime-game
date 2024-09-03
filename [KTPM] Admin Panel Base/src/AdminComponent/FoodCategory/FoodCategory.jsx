import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { FoodCategoryTable } from './FoodCategoryTable'


export const FoodCategory = () => {
  const [filterValue, setFilterValue] = React.useState('all')

  const handleFilter=(e)=>{
    setFilterValue(e.target.value)
  }
  return (
    <div className='px-2'>
      <FoodCategoryTable/>
    </div>
  )
}
