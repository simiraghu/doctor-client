import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button, Grid, MenuItem } from '@mui/material';
import axios from 'axios'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

const DoctorPage = () => {

    const specialties = [
        'General Practitioner',
        'Cardiologist',
        'Dermatologist',
        'Neurologist',
        'Pediatrician',
        'Psychiatrist',
        'Surgeon'
    ];

    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState("");
    const navigate = useNavigate()

    const [value, setValue] = useState(
        {
            name: '',
            email: '',
            fees: '',
            experience: '',
            image: '',
            specialty: ''
        }
    )

    const handleOnchange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const setFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageBase64(reader?.result);
        };

    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setFileToBase64(file);

    };

    useEffect(() => {
        if (imageBase64) {
            setValue(
                {
                    ...value,
                    image: imageBase64
                }
            )
        }

    }, [imageBase64])


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/doctor/create_doctor`, value,
                {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
            if (data?.success) {
                message.success(data?.message)
            }
            
            navigate('/doctors')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="sm">

            <Box
                component="form"
                onSubmit={handleOnSubmit}
                sx={
                    {
                        mt: 3
                    }
                }
            >

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Doctor Name"
                            variant="outlined"
                            name="name"
                            value={value?.name}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={value?.email}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="specialty"
                            name="specialty"
                            label="Specialty"
                            value={value?.specialty}
                            onChange={(e) => handleOnchange(e)}
                            select
                        >
                            {
                                specialties.map((val, i) => (
                                    <MenuItem
                                        key={i}
                                        value={val}
                                    >
                                        {val}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Experience (Years)"
                            variant="outlined"
                            type="number"
                            name='experience'
                            value={value?.experience}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Fees"
                            variant="outlined"
                            type="number"
                            name='fees'
                            value={value?.fees}
                            onChange={(e) => handleOnchange(e)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            type="file"
                            accept=".jpg, .jpeg"
                            name="image"
                            onChange={handleImage}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Save Doctor Details
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DoctorPage;
