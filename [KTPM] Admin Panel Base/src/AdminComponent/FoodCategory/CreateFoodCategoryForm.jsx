import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Restaurant/Action';

export const CreateFoodCategoryForm = () => {
    const dispatch = useDispatch()

    const { restaurant } = useSelector(state => state)
    const handleSubmit = (e) => {
        const data={
            name:FormData.categoryName,
            restaurantId:0
        }
        dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem('jwt')}))
    }

    const [FormData, setFormData] = useState({
        categoryName: '',
        restaurantId: ''
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
            Create Category
        </h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
        <TextField fullWidth
                id='categoryName'
                name='categoryName'
                label='Category Name'
                variant='outlined'
                onChange={handleInputChange}
                value={FormData.categoryName}
              />

        <Button variant='contained' color='primary' type='submit' className='mt-3'>
            Create Food Category
        </Button>
        </form>
    </div>
  )
}
