import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import User from './user';
const usersCollection = [
    {
        id:          0,
        firstName:   'Dmytro',
        lastName:    'Anastasiev',
        dateOfBirth: '27/09/1995',
        email:       'dmytro.anastasiev@gmail.com',
    },
    {
        id:          1,
        firstName:   'Kyryllo',
        lastName:    'Matushkin',
        dateOfBirth: '13/03/1996',
        email:       'kyryllo.matushkin@gmail.com',
    },
    {
        id:          2,
        firstName:   'Alex',
        lastName:    'Volontyr',
        dateOfBirth: '17/05/1996',
        email:       'loh.pidr@gmail.com',
    },
    {
        id:          3,
        firstName:   'Vova',
        lastName:    'Mordas',
        dateOfBirth: '1/01/1955',
        email:       'vova.mordas@gmail.com',
    }
];

const Users = () => {
    const [users, setUsers] = useState(usersCollection);

    const addUser = (user) => setUsers([...users, { ...user, id: new Date().getTime() }]);

    const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

    const updateUser = (updatedUser) => setUsers(users.map((u) => u.id === updatedUser.id ? updatedUser : u));

    return (
        <Box display = 'flex' flexDirection = 'column' alignItems = 'center' minWidth = '500px' width = { '60%' }>
            {
                users.map((u) =>
                    (<User
                        deleteUser = { deleteUser }
                        key = { u.id }
                        updateUser = { updateUser }
                        user = { u }
                    />)
                )
            }
        </Box>
    );
};

export default Users;
