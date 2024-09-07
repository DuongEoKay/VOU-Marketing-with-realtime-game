import { AddPhotoAlternate, Face } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, circularProgressClasses } from '@mui/material';
import { Field, Formik } from 'formik';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { upload2Cloudinary } from '../Utils/Upload2Cloudinary';
import { useDispatch } from 'react-redux';
import { createGame } from '../../component/State/Game/Action';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  image: '',
  type: '',
  allowItemExchange: true,
  instructions: '',
  active: true,
};

export const UpdateGameForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImage, setUploadImage] = useState(false);

  const handleImageChange = async (e, setFieldValue) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await upload2Cloudinary(file);
    setFieldValue('image', image);
    setUploadImage(false);
  };

  const handleSubmit = (values) => {
    const jwt = localStorage.getItem('jwt')
    dispatch(createGame({ userData: values, jwt, navigate }));
  };

  return (
    <div>
      <Typography variant='h5' className='text-center'>
        Create Game
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ handleSubmit, setFieldValue, values }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Field
                  as={TextField}
                  name='name'
                  label='Game name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  as={TextField}
                  name='type'
                  label='Type'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Field
                  as={TextField}
                  name='instructions'
                  label='Instruction'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12} sm={2.5}>
                <FormControl fullWidth margin='normal'>
                  <InputLabel id="role-simple-select-label">Allow Item Exchange?</InputLabel>
                  <Field
                    as={Select}
                    labelId="role-simple-select-label"
                    id="role-simple-select"
                    label="Allow Item Exchange?"
                    name='allowItemExchange'
                  >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>

                  </Field>
                </FormControl>
              </Grid>
              <Grid className='flex flex-wrap gap-5' item xs={12}>
                <label>Image</label>
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
                  {values.image && (
                    <div className='relative'>
                      <img
                        className='w-24 h-24 object-cover'
                        src={values.image}
                        alt='Image'
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
              Create
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
