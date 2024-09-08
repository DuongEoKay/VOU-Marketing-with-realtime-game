import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Avatar, Box, IconButton, Modal } from '@mui/material';
import { Delete, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import FilterComponent from './FilterComponent';
import { RegisterForm } from '../../component/Auth/RegisterForm';
import { useLocation } from 'react-router-dom'
import { deleteGame, getAllGame } from '../../component/State/Game/Action';
import { CreateGameForm } from './CreateGameForm';
import { UpdateGameForm } from './UpdateGameForm';

export const GameTable = () => {
    const location = useLocation()

    const handleOnClose = () => {
        navigate('/admin/game')
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
    const { game } = useSelector(state => state);
    const navigate = useNavigate();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        dispatch(getAllGame({ jwt: localStorage.getItem('jwt') }));
    }, [dispatch]);

    const handleRemoveGame = (gameId) => {
        dispatch(deleteGame({ gameId, jwt: localStorage.getItem('jwt') }));
    };

    const [selectedGameId, setSelectedGameId] = useState(null);
    const handleUpdateClick = (id) => {
        setSelectedGameId(id);
        console.log("id", id);
        navigate('/admin/game/update');
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },,
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Image',
            cell: row => <Avatar src={row.image} />,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Allow Exchange?',
            selector: row => (row.allowItemExchange? 'Yes' : 'No'),
            sortable: true,
        },
        {
            name: 'Instruction',
            selector: row => row.instructions,
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
                    <IconButton onClick={() => {handleUpdateClick(row.id)}}>
                        <EditIcon style={{ color: 'black' }}/>
                    </IconButton>
                </>
            )},
            {

            name: 'Delete',
            cell: row => (
                <>
                    <IconButton onClick={() => handleRemoveGame(row.id)}>
                        <Delete style={{ color: 'black' }}/>
                    </IconButton>
                </>
            )
        },
    ];


    console.log("game",game);

    const filteredItems = game.game.filter(
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

    const handleAddGameClick = () => {
        navigate('/admin/game/create');
    };

    return (
        <div>
            <DataTable
                title="Manage All Games"
                columns={columns}
                data={filteredItems}
                defaultSortField="fullName"
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
            />
            <a style={{ marginRight: '50px', color: 'blue', float: 'right' }}  onClick={handleAddGameClick}> Add New Game ?</a>
            <Modal
                open={location.pathname === '/admin/game/create'}
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    <CreateGameForm />
                </Box>

            </Modal>
            <Modal
                open={location.pathname === '/admin/game/update'}
                onClose={handleOnClose}
            >
                <Box sx={style}>
                    <UpdateGameForm id={selectedGameId}/>
                </Box>
            </Modal>
        </div>
    );
};