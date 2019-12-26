import React, { Fragment, useState } from 'react';
import cx from 'classnames';
import { Avatar, Button, Box, Card, Typography, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import lime from '@material-ui/core/colors/lime';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CreateIcon from '@material-ui/icons/Create';

const getFirstLetters = (firstName = ' ', lastName = ' ') => `${firstName[0]}${lastName[0]}`;

const useStyles = makeStyles(() => ({
    avatar: {
        width:    180,
        height:   180,
        fontSize: 40,
        opacity:  0.8,
    },
    dateOfBirth: {
        fontSize: 20,
    },
    purple: {
        backgroundColor: purple[500],
    },
    red: {
        backgroundColor: red[500],
    },
    indigo: {
        backgroundColor: indigo[500],
    },
    blue: {
        backgroundColor: blue[500],
    },
    lime: {
        backgroundColor: lime[500],
    },
    orange: {
        backgroundColor: orange[500],
    },
    green: {
        backgroundColor: green[500],
    },
    teal: {
        backgroundColor: teal[500],
    },
    deleteIcon: {
        color: red[500],
    },
    editIcon: {
        color: blue[500],
    },
    buttonSave: {
        backgroundColor: blue[500],
        color:           '#fafafa',
    },
}));

const COLORS = [
    'purple',
    'red',
    'indigo',
    'blue',
    'teal',
    'lime',
    'orange',
    'green'
];

const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.length);

    return COLORS[randomIndex];
};

const ViewMode = ({ firstName, lastName, email, dateOfBirth, classes }) => (
    <Fragment>
        <Typography variant = 'h4'>
            {`${firstName} ${lastName}`}
        </Typography>
        <Typography variant = 'h5'>
            { email }
        </Typography>
        <Typography className = { classes.dateOfBirth } display = 'block' variant = 'overline'>
            { dateOfBirth }
        </Typography>
    </Fragment>
);
const EditMode = ({ id, firstName, lastName, email, dateOfBirth, setEdit, updateUser, classes }) => {
    const [editedFirstName, setFirstName] = useState(firstName);
    const [editedLastName, setLastName] = useState(lastName);
    const [editedEmail, setEmail] = useState(email);
    const [editedDateOfBirth, setDateOfBirth] = useState(dateOfBirth);

    return (
        <Fragment>
            <Box mb = '20px'>
                <TextField
                    defaultValue = { editedFirstName }
                    label = 'First Name'
                    variant = 'outlined'
                    fullWidth
                    onChange = { (e) => setFirstName(e.target.value) }
                />
            </Box>
            <Box mb = '20px'>
                <TextField
                    defaultValue = { editedLastName }
                    label = 'Last Name'
                    variant = 'outlined'
                    fullWidth
                    onChange = { (e) => setLastName(e.target.value) }
                />
            </Box>
            <Box mb = '20px'>
                <TextField
                    defaultValue = { editedEmail }
                    fullWidth
                    label = 'Email'
                    type = 'email'
                    variant = 'outlined'
                    onChange = { (e) => setEmail(e.target.value) }
                />
            </Box>
            <Box mb = '20px'>
                <TextField
                    defaultValue = { editedDateOfBirth }
                    label = 'Date of birth'
                    variant = 'outlined'
                    fullWidth
                    onChange = { (e) => setDateOfBirth(e.target.value) }
                />
            </Box>
            <Box alignItems = 'center' display = 'flex' justifyContent = 'flex-end'>
                <Button
                    variant = 'contained'
                    onClick = { () => setEdit(false) }>
                  Cancel
                </Button>
                <Box pl = '10px'>
                    <Button
                        className = { classes.buttonSave }
                        variant = 'contained'
                        onClick = { () => {
                            updateUser(
                                {
                                    id,
                                    firstName:   editedFirstName,
                                    lastName:    editedLastName,
                                    email:       editedEmail,
                                    dateOfBirth: editedDateOfBirth,
                                });
                            setEdit(false);
                        }
                        }>
                  Save
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
};

const User = ({ deleteUser, updateUser, user }) => {
    const classes = useStyles();
    const [editMode, setEditMode] = useState(false);

    return (
        <Box mb = '20px' width = '100%'>
            <Card>
                <Box display = 'flex' justifyContent = 'space-between' p = '10px'>
                    <Box alignItems = 'center' display = 'flex'>
                        <Avatar
                            className = { cx(classes.avatar, classes[getRandomColor()]) }>
                            { getFirstLetters(user.firstName, user.lastName) }
                        </Avatar>
                    </Box>
                    <Box display = 'flex' flexDirection = 'column' justifyContent = 'space-around' width = '45%'>
                        { editMode ? <EditMode { ...user } classes = { classes } updateUser = { updateUser } setEdit = { setEditMode } /> : <ViewMode { ...user } classes = { classes } />}
                    </Box>
                    <Box display = 'flex' height = '50px' justifyContent = 'flex-end' width = '10%'>
                        <IconButton disabled = { editMode } onClick = { () => setEditMode(true) }>
                            <CreateIcon className = { classes.editIcon } />
                        </IconButton>
                        <IconButton disabled = { editMode } onClick = { () => deleteUser(user.id) }>
                            <DeleteForeverIcon className = { classes.deleteIcon } />
                        </IconButton>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default User;
