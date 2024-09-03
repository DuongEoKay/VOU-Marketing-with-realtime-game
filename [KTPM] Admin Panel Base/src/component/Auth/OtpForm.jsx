import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Action'




const initialValues = {
  username:'',
  otp: ''
}
export const OtpForm = (username) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleSubmit = (values) => {
    values.username = localStorage.getItem("username")
    dispatch(loginUser({userData:values, navigate}))
  }
  return (
    <div>
      <Typography variant='h6' className='text-center'  >
      We'll call you now. Please listen for the OTP and enter it here.
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form >


          <Field
            as={TextField}
            name='otp'
            label='OTP'
            variant='outlined'
            fullWidth
            margin='normal'
            type='OTP'
          />

          <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary'>
            Login
          </Button>


        </Form>
      </Formik>

    </div>
  )
}
