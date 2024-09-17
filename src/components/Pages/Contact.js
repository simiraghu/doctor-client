import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';

const ContactContainer = styled(Box)(({ theme }) => (
    {
        padding: theme.spacing(4),
        maxWidth: '600px',
        margin: 'auto',
        marginTop: theme.spacing(4),
        boxShadow: theme.shadows[2],
    }));

const ContactUs = () => {
    return (
        <Box>
            <ContactContainer  component={Paper}>
            
                <Typography
                    variant="h6"
                    gutterBottom>
                    Our Contact Information
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            display="flex">
                            <LocationOnIcon color="primary" />
                            <Box ml={2}>
                                <Typography variant="body1">Address:</Typography>
                                <Typography variant="body2">123 Clinic St, Health City </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box
                            display="flex">
                            <PhoneIcon color="primary" />
                            <Box ml={2}>
                                <Typography variant="body1">Phone:</Typography>
                                <Typography variant="body2">+123 456 7890</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex">
                            <EmailIcon color="primary" />
                            <Box ml={2}>
                                <Typography variant="body1">Email:</Typography>
                                <Typography variant="body2">DoctorAppointment@clinic.com</Typography>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex">
                            <InstagramIcon color="primary" />
                            <Box ml={2}>
                                <Typography variant="body1">Instagram:</Typography>
                                <Typography variant="body2">@doctor_appointment</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ContactContainer>
        </Box>
    );
};

export default ContactUs;
