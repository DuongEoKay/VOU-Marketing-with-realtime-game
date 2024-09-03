import { AddPhotoAlternate, Face } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, circularProgressClasses } from '@mui/material';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { upload2Cloudinary } from '../../AdminComponent/Utils/Upload2Cloudinary';
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  fullName: '',
  password: '',
  role: '',
  phone: '',
  username: '',
  avatar: '',
  dateOfBirth: '',
  sex: '',
  facebook: '',
};

export const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e, setFieldValue) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await upload2Cloudinary(file);
    setFieldValue('avatar', image);
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
        {({ handleSubmit, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field
                  as={TextField}
                  name='fullName'
                  label='Fullname'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  as={TextField}
                  name='email'
                  label='Email'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name='phone'
                  label='Phone'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name='dateOfBirth'
                  label='Date of Birth'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  type='date'
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Field
                  as={TextField}
                  name='sex'
                  label='Sex'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>

              <Grid item xs={12} sm={10}>
                <Field
                  as={TextField}
                  name='facebook'
                  label='Facebook'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name='username'
                  label='Username'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  name='password'
                  label='Password'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  type='password'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                    <MenuItem value={'ROLE_ADMIN'}>Admin</MenuItem>
                  </Field>
                </FormControl>
              </Grid>
              <Grid className='flex flex-wrap gap-5' item xs={12}>
                <label>Avatar</label>
                <input
                  accept='image/*'
                  id='fileInput'
                  style={{ display: 'none' }}
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  type='file'
                />
                <label className='relative' htmlFor="fileInput">
                  <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-600'>
                    <AddPhotoAlternate />
                  </span>
                  {uploadImage && (
                    <div className='absolute left-0 bottom-0 bg-gray-800 bg-opacity-50 text-white p-2 rounded-md'>
                      <CircularProgress />
                    </div>
                  )}
                </label>
                <div className='flex flex-wrap gap-2'>
                  {values.avatar && (
                    <div className='relative'>
                      <img
                        className='w-24 h-24 object-cover'
                        src={values.avatar}
                        alt='Avatar'
                      />
                      <IconButton
                        size='small'
                        sx={{ position: 'absolute', top: 0, right: 0 }}
                        onClick={() => setFieldValue('avatar', '')}
                      >
                        <DeleteIcon sx={{ fontSize: "1rem" }} />
                      </IconButton>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            <Button sx={{ mt: 2, padding: "1rem" }} fullWidth variant='contained' type='submit' color='primary'>
              Register
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
