import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Button, Box, IconButton } from '@mui/material';
import './Alldoctors.css';
import Spin from '../Pages/Spin'
import { useNavigate } from 'react-router-dom';
import Popover from '@mui/material/Popover';
import { message, Modal } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import defaultImage from '../../assets/defaultdoctor.jpg'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Alldoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(6);

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
    navigate(`/update_doctor?${id}`)
    setAnchorEl(null)
    setOpenModal(false)
  }

  const get_doctors = async () => {
    try {
      if (page && size) {

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors?page=${page}&size=${size}`,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })

        setDoctors(data?.doctors)
        setLoading(false)
        setTotal(data?.counts)

      } else {

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get_all_doctors`,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          })

        setDoctors(data?.doctors)
        setLoading(false)
        setTotal(data?.counts)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get_doctors()
  }, [page, size]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/doctor/delete_doctor?id=${id}`)
      get_doctors()
      setOpenModal(false)

      if (data?.success) {
        message.success(data?.message)
      }

    } catch (error) {
      message?.error(error?.response?.data?.message)
    }
  }

  const handleChange = (e, value) => {
    setPage(value)
  }

  return (
    <Container
      sx={
        {
          marginTop: '10px'
        }
      }
    >

      <Button
        type="button"
        variant="contained"
        sx={{ mt: 1, mb: 1 }}
        onClick={() => navigate('/create_doctor')}
      >
        Create Doctor
      </Button>

      <Grid
        container
        spacing={5}>
        {
          loading ? <p style={
            {
              margin: "auto"
            }
          }>  <Spin /></p> : doctors.map(doctor => (

            <Grid item xs={12} sm={6} md={4} key={doctor?._id}>

              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center">

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={
                        {
                          display: "flex",
                          alignItems: "center"
                        }
                      }>

                      <img
                        src={doctor?.image ? doctor?.image : defaultImage}
                        style={
                          {
                            width: "50px",
                            height: "50px",
                            borderRadius: "30px",
                            margin: "4px"
                          }
                        }
                        alt={defaultImage}
                      />
                      {doctor?.name}
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
                        <MoreVertIcon onClick={(e) => handleClick(e, doctor?._id)} />
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
                      </Popover>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="textSecondary">
                    <b>Experience: </b>  {doctor?.experience} years
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary">
                    <b>Email:</b> {doctor?.email}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary">
                    <b>Specialty:</b>  {doctor?.specialty}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary">
                    <b>Fees:</b> {doctor?.fees}
                  </Typography>

                </CardContent>
              </Card>

              <Modal
                title="Delete the Doctor"
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

        doctors.length !== total && <Stack
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
    </Container>
  );
}

export default Alldoctors;
