import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const {restaurant} = useSelector(state => state);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createIngredientCategory({data: FormData, jwt: localStorage.getItem('jwt')}));
    }

    const [FormData, setFormData] = useState({
        categoryName: '',
        restaurantId: restaurant.usersRestaurant.id
    });

    const handleInputChange = (e) => {
        const {name, value}=e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    }

  return (
    <div className='p-5'>
        <h1 className='text-gray-400 text-center font-bold' >
            Create Ingredient Category
        </h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
        <TextField fullWidth
                id='name'
                name='name'
                label=' Ingredient Category Name'
                variant='outlined'
                onChange={handleInputChange}
                value={FormData.name}
              />

        <Button variant='contained' color='primary' type='submit' className='mt-3'>
            Create Ingredient Category
        </Button>
        
        </form>
    </div>
  )
}
