import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box, IconButton } from '@mui/material';
import './AllAppointments.css';
import moment from 'moment';
import Spin from '../Pages/Spin'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { message, Modal } from 'antd';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function AllAppointments() {

    const [appointments, setAppointments] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const [total, setTotal] = useState(null);
    const [page, setPage] = useState(1);
    const [size] = useState(6);

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id)
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedId(null)
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleUpdate = async (id) => {
        navigate(`/update_appointment?${id}`)
        handleClose()
    }

    const get_appointments = async () => {
        try {
            if (page && size) {

                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/get_all_appointments?page=${page}&size=${size}`,
                    {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })

                setAppointments(data?.all_appointments)
                setTotal(data?.count)
                setLoading(false)

            } else {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/appointment/get_all_appointments`,
                    {
                        headers: {
                            token: localStorage.getItem('token')
                        }
                    })

                setAppointments(data?.all_appointments)
                setTotal(data?.count)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        get_appointments()
    }, [page, size]);

    const handleDelete = async (id) => {
        try {
            setOpenModal(false)
            setAnchorEl(null)

            const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/appointment/delete_appointments?id=${id}`)

            if (data?.success) {
                message?.success(data?.message)
            }

            get_appointments()

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e, value) => {
        setPage(value)
    }

    return (
        <Container sx={{ marginTop: '30px' }}>
            <Grid container spacing={5}>
                {
                    loading
                        ?
                        <p style={
                            {
                                margin: "auto"
                            }
                        }>
                            <Spin />
                        </p>
                        :
                        appointments.map(appointment => (
                            <Grid
                                style={{ margin: "auto" }}
                                item
                                xs={12}
                                sm={6}
                                md={4} key={appointment?.id}>
                                <Card >
                                    <CardContent>

                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                            alignItems="center">

                                            <Typography variant="body2" color="textSecondary">
                                                <b>Patient Name: </b>{appointment?.patientname}
                                            </Typography>

                                            <Box>
                                                <IconButton
                                                    aria-label="more"
                                                    size="small"
                                                    sx={
                                                        {
                                                            cursor: "pointer"
                                                        }
                                                    }>
                                                    <MoreVertIcon onClick={(e) => handleClick(e, appointment?._id)} />
                                                </IconButton>

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
                                                    }>
                                                    <>
                                                        <Typography
                                                            sx={
                                                                {
                                                                    m: 2,
                                                                    cursor: "pointer"
                                                                }
                                                            }
                                                            onClick={() => handleUpdate(selectedId)}>
                                                            Edit
                                                        </Typography>

                                                        <Typography
                                                            sx={
                                                                {
                                                                    m: 2,
                                                                    cursor: "pointer"
                                                                }
                                                            }
                                                            onClick={() => {
                                                                setOpenModal(true);
                                                                setAnchorEl(null);
                                                            }}>
                                                            Delete
                                                        </Typography>
                                                    </>
                                                </Popover>
                                            </Box>
                                        </Box>

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

                                <Modal
                                    title="Delete the appointment"
                                    centered
                                    open={openModal}
                                    onOk={() => handleDelete(selectedId)}
                                    onCancel={() => setOpenModal(false)}
                                    width={500}
                                >
                                    <p>Are you sure you want to delete this ?</p>
                                </Modal>

                            </Grid>
                        ))
                }
            </Grid>

            {
                appointments.length !== total &&
                <Stack
                    spacing={10}
                    sx={
                        {
                            alignItems: "center",
                            margin: "30px"
                        }
                    }>
                    <Pagination
                        count={Math.ceil(total / size)}
                        page={page}

                        onChange={handleChange}
                        color="primary" />
                </Stack>
            }
        </Container >
    );
}

export default AllAppointments;
