import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CreateIngredientForm } from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
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

const orders = [1, 1, 1, 1, 1, 1]
export const IngredientsTable = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const {restaurant, ingredients} = useSelector(state => state)
    const jwt = localStorage.getItem('jwt')

    useEffect(() => {
        dispatch(getIngredientsOfRestaurant({id: restaurant.usersRestaurant?.id, jwt: jwt}))
    }, [])


    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    action={<IconButton aria-label="settings" onClick={handleOpen}>
                        <EditIcon />
                    </IconButton>}
                    title='Ingredients'
                    sx={{ pt: 2, alignItems: 'center' }}

                />
            </Card>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Category</TableCell>
                            <TableCell align="right">Availability</TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ingredients.ingredients.map((item) => (
                            <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="right">{item.name}</TableCell>
                                <TableCell align="right">{item.category.name}</TableCell>
                                <TableCell align="right">{item.available?'Yes':'No'}</TableCell>
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
                    <CreateIngredientForm />
                </Box>
            </Modal>
        </Box>

    )
}
