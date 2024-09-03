import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { OrderTable } from './OrderTable';


const orderStatus = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'pending',
    label: 'Pending',
  },
  {
    value: 'completed',
    label: 'Completed',
  },

];
export const Orders = () => {
  const [filterValue, setFilterValue] = React.useState('all')

  const handleFilter=(e)=>{
    setFilterValue(e.target.value)
  }
  return (
    <div className='px-2'>
      {/* <Card className='p-5'>
        <Typography sx={{paddingBottom:"1rem"}} variant='h5'>
          Order Status
        </Typography>
        <FormControl>
          <RadioGroup onChange={handleFilter} row name ='category' value={filterValue||"all"}>
            
            {orderStatus.map((item,i)=><FormControlLabel key={i} value={item.value} control={<Radio/>} label={item.label} sx={{color:"gray"}}/>)}
          </RadioGroup>
        </FormControl>
      </Card> */}

      <OrderTable/>
    </div>
  )
}
