import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { deleteFoodAction, getAllUser } from '../../component/State/User/Action';
import { Avatar, Box, IconButton, Modal } from '@mui/material';
import { Delete, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import FilterComponent from './FilterComponent';
import { RegisterForm } from '../../component/Auth/RegisterForm';
import { useLocation } from 'react-router-dom'

export const UserTable = () => {
    const location = useLocation()

    const handleOnClose = () => {
        navigate('/admin/restaurant/user')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.main',
        outline: "none",
        boxShadow: 24,
        p: 4,
        
    };
    const dispatch = useDispatch();
    const { user } = useSelector(state => state);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        dispatch(getAllUser({ jwt: localStorage.getItem('jwt') }));
    }, [dispatch]);

    const handleRemoveUser = (userId) => {
        dispatch(deleteFoodAction({ userId, jwt: localStorage.getItem('jwt') }));
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Avatar',
            cell: row => <Avatar src={row.avatar} />,
        },
        {
            name: 'Fullname',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Date Of Birth',
            selector: row => row.dateOfBirth,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.sex,
            sortable: true,
        },
        {
            name: 'Facebook',
            selector: row => row.facebook,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Active?',
            selector: row => (row.active ? 'Yes' : 'No'),
            sortable: true,
        },
        {
            name: 'Update',
            cell: row => (
                <>
                    <IconButton onClick={() => navigate(`/admin/restaurant/edit-user/${row.id}`)}>
                        <EditIcon style={{ color: 'black' }}/>
                    </IconButton>
                </>
            )},
            {

            name: 'Delete',
            cell: row => (
                <>
                    <IconButton onClick={() => handleRemoveUser(row.id)}>
                        <Delete style={{ color: 'black' }}/>
                    </IconButton>
                </>
            )
        },
    ];

    const filteredItems = user.user.filter(
        item => JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const handleRegisterClick = () => {
        navigate('/admin/restaurant/user/register');
    };

    return (
        <div>
            <DataTable
                title="Manage All Users"
                columns={columns}
                data={filteredItems}
                defaultSortField="fullName"
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
            />
            <a style={{ marginRight: '50px', color: 'blue', float: 'right' }}  onClick={handleRegisterClick}> Add New User ?</a>
            <Modal
                open={location.pathname === '/admin/restaurant/user/register'}
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    <RegisterForm />
                </Box>
            </Modal>
        </div>
    );
};