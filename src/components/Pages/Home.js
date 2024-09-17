import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className={`home-page ${isLoaded ? 'slide-in' : ''}`}>
      <div className="content">
        <h1>Welcome to Our Doctor Appointment System</h1>
        <p>Book your appointment with the best doctors in town.</p>
        <button
          className="book-appointment"
          onClick={() => navigate('/appointments')}>
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default HomePage;
