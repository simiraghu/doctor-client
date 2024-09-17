import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileIcon from '@mui/icons-material/Person'
import Popover from '@mui/material/Popover';

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const navigate = useNavigate()
    const location = useLocation()
    const [role, setRole] = useState('')

    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/login')
        setRole('')
        handleClose()
    }

    (
        async function () {
            if (location.pathname !== '/login' && location.pathname !== 'signup'
                &&
                location.pathname !== '/' && location.pathname !== '/doctors') {

                try {
                    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/get_admin`,
                        {
                            headers: {
                                token: localStorage.getItem('token')
                            }
                        })
                    if (!data?.success) {
                        handleLogOut()
                    }
                } catch (error) {
                    console.log(error)
                    handleLogOut()
                }
            }

            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/user/get_admin`,
                    {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })
                setRole(data?.role)
            } catch (error) {
                console.log(error)
            }
        }
    )()


    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={
                            {
                                flexGrow: 1
                            }
                        }
                    >
                        Doctor Appointment
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
                    <Button color="inherit" component={Link} to="/doctors">Doctors</Button>
                    <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    {

                        role === 'admin'
                        &&
                        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
                    }

                    <div>
                        <ProfileIcon
                            onClick={handleClick}
                            style={
                                {
                                    cursor: "pointer"
                                }
                            }
                        />
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={
                                {
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }
                            }
                        >

                            {
                                localStorage.getItem('token') ?
                                    <>
                                        <Typography
                                            sx={
                                                {
                                                    m: 2,
                                                    cursor: "pointer"
                                                }
                                            }
                                            onClick={() => navigate('/myappointments')}>
                                            My Appointments
                                        </Typography>

                                        <Typography
                                            sx={
                                                {
                                                    m: 2,
                                                    cursor: "pointer"
                                                }
                                            }
                                            onClick={() => handleLogOut()}
                                        >
                                            Logout
                                        </Typography>
                                    </>
                                    :
                                    <Typography
                                        sx={
                                            {
                                                m: 2,
                                                cursor: "pointer"
                                            }
                                        }
                                        onClick={() => navigate('/login')}
                                    >
                                        Login
                                    </Typography>
                            }
                        </Popover>
                    </div>
                </Toolbar>
            </AppBar>
        </>

    );
}

export default Navbar;
