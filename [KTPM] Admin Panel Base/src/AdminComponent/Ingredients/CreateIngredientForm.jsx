import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';

export const CreateIngredientForm = () => {
    const dispatch = useDispatch()
    const {ingredients, restaurant} = useSelector(state => state)
    const jwt = localStorage.getItem('jwt')

    const handleSubmit = (e) => {
        const data = {
            name: FormData.name,
            restaurantId: restaurant.usersRestaurant.id,
            categoryId: FormData.ingredientCategoryId
        }

        dispatch(createIngredient({data, jwt}))
    }

    const [FormData, setFormData] = useState({
        name: '',
        ingredientCategoryId: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...FormData,
            [name]: value
        });
    }


    return (
        <div className='p-5'>
            <h1 className='text-gray-400 text-center font-bold' >
                Create Ingredient
            </h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <TextField fullWidth
                    id='ingredientName'
                    name='name'
                    label='Name'
                    variant='outlined'
                    onChange={handleInputChange}
                    value={FormData.name}
                />

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ingredient Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="ingredientCategoryId"
                        value={FormData.ingredientCategoryId}
                        label="Category ID"
                        onChange={handleInputChange}
                        name='ingredientCategoryId'
                    >
                        {ingredients.category.map((item)=><MenuItem value={item.id} >{item.name}</MenuItem>) }
                    </Select>
                </FormControl>

                <Button variant='contained' color='primary' type='submit' className='mt-3'>
                    Create Ingredient
                </Button>
            </form>
        </div>
    )
}
