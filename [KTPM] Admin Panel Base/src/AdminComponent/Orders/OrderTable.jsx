import { Avatar, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/RestaurantOrder/Action'

const status = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Delivered', value: 'DELIVERED' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'Cancelled', value: 'CANCELLED' }
]

export const OrderTable = () => {
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('jwt')
    const { restaurant, restaurantOrder } = useSelector(state => state)

    const [anchorEl, setAnchorEl] = React.useState({});
    const open = Boolean(anchorEl);
    const handleUpdateStatus = ({ orderId, status }) => {
        dispatch(updateOrderStatus({ orderId: orderId, orderStatus: status, jwt: jwt }))
    }

    const handleClick = (orderId, event) => {
        setAnchorEl(prev => ({ ...prev, [orderId]: event.currentTarget }));
    };
    const handleClose = (orderId) => {
        setAnchorEl(prev => ({ ...prev, [orderId]: null }));
    };


    useEffect(() => {
        dispatch(fetchRestaurantsOrder({ restaurantId: restaurant.usersRestaurant.id, jwt: jwt }))
    }, [])
    return (
        <Box>
            <Card className='mt-1'>
                <CardHeader
                    title='All Orders'
                    sx={{ pt: 2, alignItems: 'center' }}

                />
            </Card>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">IMG</TableCell>
                            <TableCell align="right">Customer</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Ingredients</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurantOrder.orders.map((item) => (
                            <TableRow
                                key={item.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="right"> {item.items.map((item) => <Avatar src={item.food.imgs[0]} />)}</TableCell>
                                <TableCell align="right">{item.customer.fullName}</TableCell>
                                <TableCell align="right">{item.totalPrice}</TableCell>
                                <TableCell align="right">{item.items.map((orderItem) => <p>{orderItem.food.name}</p>)}</TableCell>
                                <TableCell align="right">{item.items.map((orderItem) =>
                                    <div>
                                        {orderItem.ingredients.map((ingredient) => <Chip label={ingredient} />)}
                                    </div>
                                )}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(event) => handleClick(item.id, event)}
                                    >
                                        {item.orderStatus}
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl && anchorEl[item.id] ? anchorEl[item.id] : null}
                                        open={Boolean(anchorEl && anchorEl[item.id])}
                                        onClose={() => handleClose(item.id)}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        {status.map((state) => (
                                            <MenuItem onClick={() => handleUpdateStatus({ orderId: item.id, status: state.value })}>{state.value}</MenuItem>
                                        ))}
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>

    )
}
