import React, { useState } from 'react';
import { Box, Button, Container, Grid, TextField, Card, CardContent, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const LoginSignup = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navigate = useNavigate()

    const [loginData, setLoginData] = useState(
        {
            email: '',
            password: ''
        }
    );

    const [signupData, setSignupData] = useState(
        {
            username: '',
            email: '',
            phonenumber: '',
            city: '',
            country: '',
            password: ''
        }
    );

    const handleLoginChange = (e) => {
        setLoginData(
            {
                ...loginData,
                [e.target.name]: e.target.value
            }
        );
    };

    const handleSignupChange = (e) => {
        setSignupData(
            {
                ...signupData,
                [e.target.name]: e.target.value
            }
        );
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/login_user`, loginData)
            localStorage.setItem('token', data?.token)

            if (data?.success) {
                message.success(data?.message)
            }

            navigate('/')

        } catch (err) {
            message.error(err?.response?.data?.message)
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/user/create_user`, signupData)
            localStorage.setItem('token', data?.token)

            if (data?.success) {
                message.success(data?.message)
            }

            navigate('/')

        } catch (error) {
            message.error(error?.response?.data?.message)
        }
    };

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={
                {
                    marginTop: "30px"
                }
            }
        >
            <Card>
                <CardContent>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                    >
                        <Tab label="Login" />
                        <Tab label="Sign Up" />
                    </Tabs>
                    {
                        value === 0 && (
                            <Box
                                component="form"
                                onSubmit={handleLoginSubmit}
                                sx={
                                    {
                                        mt: 3
                                    }
                                }
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Login
                                </Button>
                            </Box>
                        )
                    }
                    {
                        value === 1 && (
                            <Box
                                component="form"
                                onSubmit={handleSignupSubmit}
                                sx={
                                    {
                                        mt: 3
                                    }
                                }
                            >

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                            value={signupData.username}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={signupData.email}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="phonenumber"
                                            label="Phone Number"
                                            name="phonenumber"
                                            autoComplete="phone"
                                            value={signupData.phone}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="city"
                                            label="City"
                                            name="city"
                                            autoComplete="city"
                                            value={signupData.city}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="country"
                                            label="Country"
                                            name="country"
                                            autoComplete="country"
                                            value={signupData.country}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                        />
                                    </Grid>

                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                            </Box>
                        )
                    }
                </CardContent>
            </Card>
        </Container>
    );
};

export default LoginSignup;
