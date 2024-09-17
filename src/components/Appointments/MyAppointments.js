import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import '../dashboard/AllAppointments.css';
import Spin from '../Pages/Spin'
import moment from 'moment';

function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    const get_appointments = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/get_appointments_by_userId`, {
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            setAppointments(data?.appointments)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_appointments()
    }, []);

    return (
        <Container sx={{ marginTop: '10px' }}>
            <Grid container spacing={5} sx={{ marginTop: "10px" }}>
                {
                    loading
                        ?
                        <p
                            style={
                                {
                                    margin: "auto"
                                }
                            }>
                            <Spin />
                        </p>
                        :
                        appointments.map(appointment => (
                            <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                                <Card>
                                    <CardContent>

                                        <Typography variant="body2" color="textSecondary">
                                            <b>Patient Name: </b>{appointment?.patientname}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Date of birth:</b>  {appointment?.dob}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Gender:</b> {appointment?.gender}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Doctor Name:</b>  {appointment?.doctorname}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Phone Number:</b> {appointment?.phonenumber}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Specialty: </b>{appointment?.specialty}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Email: </b>{appointment?.email}
                                        </Typography>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            <b>Date Time: </b>{moment(appointment?.datetime).format('MMMM Do YYYY, h:mm:ss a')}
                                        </Typography>
                                        
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                }
            </Grid>
        </Container>
    );
}

export default AllAppointments;
