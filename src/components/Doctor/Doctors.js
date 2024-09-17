import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import axios from 'axios'
import doctorImage from '../../assets/defaultdoctor.jpg'
import './DoctorsSection.css';
import { useNavigate } from 'react-router-dom'
import Spin from '../Pages/Spin'

const Doctors = () => {

    const [doctors, setDoctors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [specialty, setSpecialty] = useState('All');

    const navigate = useNavigate()

    const specialties = [
        'All',
        'General Practitioner',
        'Cardiologist',
        'Dermatologist',
        'Neurologist',
        'Pediatrician',
        'Psychiatrist',
        'Surgeon'
    ];

    const handleChange = (event) => {
        setSpecialty(event.target.value);
    };

    const get_doctors = async () => {
        try {
            if (specialty !== 'All') {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors?specialty=${specialty}`)
                setDoctors(data?.doctors)
                setIsLoaded(true)
                setIsLoading(false)

            } else {

                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors`)
                setDoctors(data?.doctors)
                setIsLoaded(true)
                setIsLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_doctors()
    }, [specialty])

    return (
        <>
            <Box
                sx={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                }>
                <FormControl
                    sx={
                        {
                            margin: '10px 5px',
                            width: '30vw'
                        }
                    }
                    variant="outlined"
                >
                    <InputLabel id="specialty-label">Choose a Specialty</InputLabel>
                    <Select
                        labelId="specialty-label"
                        id="specialty"
                        value={specialty}
                        onChange={handleChange}
                        label="Choose a Specialty"
                    >
                        {
                            specialties.map((specialty, index) => (
                                <MenuItem
                                    key={index}
                                    value={specialty}
                                >
                                    {specialty}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Container
                component="main"
                sx={
                    {
                        mt: 4,
                        mb: 4
                    }
                }>

                {
                    isLoading ? <p style={
                        {
                            margin: "auto",
                            textAlign: 'center'
                        }
                    }
                    >
                        <Spin />
                    </p> : doctors?.length !== 0 ? doctors.map((doctor, index) => (
                        <>
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                key={index}
                                className={`doctor-card ${isLoaded ? (index % 2 === 0 ? 'slide-in-left' : 'slide-in-right') : ''}`}
                                sx={{ mb: 4 }}
                            >
                                {
                                    index % 2 === 0 ? (
                                        <>
                                            <Grid
                                                item
                                                xs={12}
                                                md={4}>
                                                <Avatar
                                                    alt={doctor?.name}
                                                    src={doctor?.image ? doctor?.image : doctorImage}
                                                    sx={{ width: 150, height: 150, margin: 'auto' }}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={8}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {doctor?.name}
                                                        </Typography>
                                                        <Typography>Specialty: {doctor?.specialty}</Typography>
                                                        <Typography>Contact: {doctor?.email}</Typography>
                                                        <Typography>Experience: {doctor?.experience}</Typography>
                                                        <Typography>Fees: {doctor?.fees}</Typography>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            sx={
                                                                {
                                                                    mt: 2
                                                                }
                                                            }
                                                            onClick={() => navigate(`/doctor_appointment?${doctor?._id}`)}
                                                        >
                                                            Book
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </>

                                    ) : (
                                        <>
                                            <Grid item xs={12} md={8}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">
                                                            {doctor?.name}
                                                        </Typography>
                                                        <Typography>Specialty: {doctor?.specialty}</Typography>
                                                        <Typography>Contact: {doctor?.email}</Typography>
                                                        <Typography>Experience: {doctor?.experience}</Typography>
                                                        <Typography>Fees: {doctor?.fees}</Typography>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            sx={
                                                                {
                                                                    mt: 2
                                                                }
                                                            }
                                                            onClick={() => navigate(`/doctor_appointment?${doctor?._id}`)}
                                                        >
                                                            Book
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs={12} md={4}>
                                                <Avatar
                                                    alt={doctor.name}
                                                    src={doctorImage}
                                                    sx={{ width: 150, height: 150, margin: 'auto' }}
                                                />
                                            </Grid>
                                        </>
                                    )}
                            </Grid>
                        </>
                    )) : <h4 style={{ textAlign: "center" }}>No doctors found</h4>
                }
            </Container>
        </>
    );
};

export default Doctors;
