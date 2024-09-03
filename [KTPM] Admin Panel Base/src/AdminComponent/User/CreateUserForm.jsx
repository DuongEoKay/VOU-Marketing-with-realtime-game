import { Button, TextField, Typography, MenuItem, FormControl, Select, InputLabel, CircularProgress, IconButton } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { upload2Cloudinary } from '../Utils/Upload2Cloudinary';
import { registerUser } from '../../component/State/Authentication/Action';

const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  sex: '',
  username: '',
  password: '',
  role: 'ROLE_CUSTOMER',
  avatar: ''
};

export const CreateUserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await upload2Cloudinary(file);
    Formik.setFieldValue('avatar', image);
    setUploadImage(false);
  };

  const handleSubmit = (values) => {
    dispatch(registerUser({ userData: values, navigate }));
  };

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {formik => (
          <Form>
            <Field
              as={TextField}
              name='fullName'
              label='Fullname'
              variant='outlined'
              fullWidth
              margin='normal'
            />

            <Field
              as={TextField}
              name='email'
              label='Email'
              variant='outlined'
              fullWidth
              margin='normal'
            />

            <Field
              as={TextField}
              name='phone'
              label='Phone'
              variant='outlined'
              fullWidth
              margin='normal'
            />

            <Field
              as={TextField}
              name='dob'
              label='Date of Birth'
              variant='outlined'
              fullWidth
              margin='normal'
              type='date'
            />

            <Field
              as={TextField}
              name='sex'
              label='Sex'
              variant='outlined'
              fullWidth
              margin='normal'
            />

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
              label='Password'
              variant='outlined'
              fullWidth
              margin='normal'
              type='password'
            />

            <FormControl fullWidth margin='normal'>
              <InputLabel id="role-simple-select-label">Role</InputLabel>
              <Field
                as={Select}
                labelId="role-simple-select-label"
                id="role-simple-select"
                label="Role"
                name='role'
              >
                <MenuItem value={'ROLE_CUSTOMER'}>Customer</MenuItem>
                <MenuItem value={'ROLE_BRAND_OWNER'}>Brand Owner</MenuItem>
              </Field>
            </FormControl>

            <input
              accept='image/*'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={handleImageChange}
              type='file'
            />
            <label htmlFor="fileInput">
              <Button variant="contained" component="span">
                Upload Avatar
              </Button>
            </label>
            {uploadImage && <CircularProgress />}

            {formik.values.avatar && (
              <div className='relative'>
                <img className='w-24 h-24 object-cover' src={formik.values.avatar} alt='Avatar' />
                <IconButton
                  size='small'
                  sx={{ position: 'absolute', top: 0, right: 0, outline: 'none' }}
                  onClick={() => formik.setFieldValue('avatar', '')}
                >
                  <DeleteIcon sx={{ fontSize: "1rem" }} />
                </IconButton>
              </div>
            )}

            <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary'>
              Register
            </Button>
          </Form>
        )}
      </Formik>

      
    </div>
  );
};