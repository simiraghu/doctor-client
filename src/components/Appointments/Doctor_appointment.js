import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { message } from 'antd'
import { useLocation } from 'react-router-dom'

const DoctorAppointment = () => {

    const location = useLocation()
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

    const [doctors, setDoctors] = useState([])
    const [singleDoctor, setSingleDoctor] = useState([])
    const [doctorname, setDoctorName] = useState('')
    const [value, setValue] = useState(
        {
            patientname: '',
            dob: '',
            gender: '',
            phonenumber: '',
            email: '',
            doctorname: doctorname,
            specialty: '',
            doctorId: '',
            datetime: dayjs().toISOString()
        }
    )

    const handleChange = (e) => {
        setValue(
            {
                ...value,
                [e.target.name]: e.target.value
            }
        )
    }

    const handleDateChange = (newValue) => {
        if (newValue) {
            setValue((prevState) => (
                {
                    ...prevState,
                    datetime: newValue.toISOString(),
                }
            ));
        } else {
            console.error('Invalid date value');
        }
    };

    const handleDoctorName = (doctor) => {
        setDoctorName(doctor?.name)
    }

    const get_doctors = async () => {
        try {
            if (value?.specialty && value?.specialty !== 'All') {

                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors?specialty=${value?.specialty}`)
                setDoctors(data?.doctors)

            } else {

                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors`)
                setDoctors(data?.doctors)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSingleDoctorById = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_doctor_by_id?id=${location?.search?.slice(1)}`)
            console.log(data)
            setValue(
                {
                    ...value,
                    specialty: data?.doctor?.specialty,
                    doctorId: data?.doctor?._id,
                    doctorname: data?.doctor?.name
                }
            )

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_doctors()
    }, [value?.specialty, singleDoctor])


    useEffect(() => {
        getSingleDoctorById()
    }, [])


    useEffect(() => {

        if (doctorname) {
            setValue((prevState) => (
                {
                    ...prevState,
                    doctorname: doctorname
                }
            ))
        }

    }, [doctorname])


    const handleOnSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/appointment/create_appointment`, value,
                {
                    headers: {
                        'token': localStorage.getItem('token')
                    }
                })

            if (data?.success) {
                message.success(data?.message)
            }
            console.log(data)
        } catch (error) {
            message.error(error?.response?.data?.message)
        }
    }

    return (
        <Container>
            <Typography
                variant="h4"
                gutterBottom
                sx={
                    {
                        textAlign: "center"
                    }
                }
            >
                Doctor Appointment
            </Typography>

            <form
                style={
                    {
                        textAlign: "center"
                    }
                }
                onSubmit={handleOnSubmit}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="patientname"
                            name="patientname"
                            label="Patient Name"
                            value={value?.patientname}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="dob"
                            name="dob"
                            label="Date of Birth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={value?.dob}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="gender"
                            name="gender"
                            label="Gender"
                            select
                            value={value?.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="phoneNumber"
                            name="phonenumber"
                            label="Phone Number"
                            value={value?.phonenumber}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="email"
                            name="email"
                            label="Email (optional)"
                            value={value?.email}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Select Date & Time"
                                name="datetime"
                                value={dayjs(value?.datetime)}
                                onChange={handleDateChange}
                                sx={{ width: '500px' }}
                                slotProps={{ textField: { variant: 'outlined' } }}

                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            sx={{ width: "500px" }}
                            id="specialty"
                            name="specialty"
                            label="Specialty"
                            select
                            value={value?.specialty}
                            onChange={handleChange}
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
                            sx={{ width: "500px" }}
                            id="doctorId"
                            name="doctorId"
                            label="Doctor name"
                            select
                            value={value?.doctorId}
                            onChange={handleChange}
                        >

                            {
                                doctors ? doctors.map((val, i) => (

                                    <MenuItem
                                        key={val?._id}
                                        value={val?._id}
                                        onClick={() => handleDoctorName(val)}
                                    >
                                        {val?.name}
                                    </MenuItem>
                                )) :
                                    <MenuItem>
                                        No doctor found in this specialty
                                    </MenuItem>
                            }
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default DoctorAppointment;
