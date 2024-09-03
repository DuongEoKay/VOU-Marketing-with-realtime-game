import { Box, Modal } from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { LoginForm } from './LoginForm'
import { OtpForm } from './OtpForm'
export const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleOnClose = () => {
        navigate('/')
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        outline: "none",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>

            <Modal
                open={
                    location.pathname === '/account/login' ||
                    location.pathname === '/account/register' ||
                    location.pathname === '/account/otp'
                }
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    {location.pathname === '/account/register' ? (
                        <RegisterForm />
                    ) : location.pathname === '/account/otp' ? (
                        <OtpForm />
                    ) : (
                        <LoginForm />
                    )}
                </Box>
            </Modal>

        </>
    )
}
