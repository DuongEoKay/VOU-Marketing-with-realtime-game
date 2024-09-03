import { Card, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'
import { IngredientsTable } from './IngredientsTable'
import { IngredientsCategoryTable } from './IngredientsCategoryTable'

export const Ingredients = () => {
  const [filterValue, setFilterValue] = React.useState('all')

  const handleFilter=(e)=>{
    setFilterValue(e.target.value)
  }
  return (
    <div className='px-2'>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={7}>
        <IngredientsTable/>
        </Grid>
        <Grid item xs={12} lg={5}>
        <IngredientsCategoryTable/>
        </Grid>

        
      </Grid>
    </div>
  )
}
