import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material'
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [slideIn, setSlideIn] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        // Trigger the sliding effect when the component mounts
        setSlideIn(true);
    }, []);

    return (
        <div className="container">
            <div className={`card card-left ${slideIn ? 'slide-in-left' : ''}`}>
                <h2>Appointments</h2>
                <p>Manage your appointments here.</p>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate('/all_appointments')}
                >
                    Appointment's Detail
                </Button>
            </div>
            
            <div className={`card card-right ${slideIn ? 'slide-in-right' : ''}`}>
                <h2>Doctors</h2>
                <p>View and manage doctors' information.</p>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate('/all_doctors')}
                >
                    Doctor's Detail
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;
