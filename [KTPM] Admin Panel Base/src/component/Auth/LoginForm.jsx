import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser, validateOtp } from '../State/Authentication/Action'




const initialValues = {
  username: '',
  password: ''
}


export const LoginForm = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    dispatch(validateOtp({userData:values, navigate}))
  }
  return (
    <div>
      <Typography variant='h5' className='text-center'  >
        Login
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form >
          <Field
            as={TextField}
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            margin='normal'
          />

          <Field
            as={TextField}
            name='password'
            label='Pasword'
            variant='outlined'
            fullWidth
            margin='normal'
            type='password'
          />

          <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary'>
            Login
          </Button>


        </Form>
      </Formik>
      <Typography variant='body2' allign='center' sx={{ mt: 3 }}>
        Don't have an account?   
        <Button size='small' onClick={() => navigate('/account/register')} color='primary'>Register</Button>
      </Typography>
    </div>
  )
}
