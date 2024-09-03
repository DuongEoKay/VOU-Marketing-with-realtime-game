import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CreateFoodCategoryForm } from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder } from '../../component/State/RestaurantOrder/Action';
import { getRestaurantById, getRestaurantsCategory } from '../../component/State/Restaurant/Action';

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const FoodCategoryTable = () => {
    const jwt = localStorage.getItem('jwt')
    const dispatch = useDispatch()
    const {  restaurant, ingredients } = useSelector(state => state)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        dispatch(getRestaurantsCategory({jwt, restaurantId:restaurant.usersRestaurant?.owner.id }))
    
    }, [restaurant.usersRestaurant?.id])

  
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={<IconButton onClick={handleOpen} aria-label="settings" >
                        <EditIcon  />
                    </IconButton>}
                    title='Category'
                    sx={{ pt: 2, alignItems: 'center' }}

                />
            </Card>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="left">Name</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurant.categories.map((item) => (
                            <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CreateFoodCategoryForm />
                </Box>
            </Modal>
        </Box>

    )
}
