import './App.css';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Pages/Login';
import Doctors from './components/Doctor/Doctors';
import HomePage from './components/Pages/Home';
import Appointments from './components/Appointments/Appointments';
import DoctorAppointment from './components/Appointments/Doctor_appointment';
import MyAppointments from './components/Appointments/MyAppointments';
import ContactUs from './components/Pages/Contact';
import Dashboard from './components/dashboard/Dashboard';
import All_appointments from './components/dashboard/All_appointments';
import All_doctors from './components/dashboard/All_doctors';
import Create_doctor from './components/dashboard/Create_doctor';
import Update_doctor from './components/dashboard/Update_doctor';
import Update_appointment from './components/dashboard/Update_appointment.js';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/appointments' element={<Appointments />} />
        <Route path='/doctor_appointment' element={<DoctorAppointment />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/all_appointments' element={<All_appointments />} />
        <Route path='/all_doctors' element={<All_doctors />} />
        <Route path='/myappointments' element={<MyAppointments />} />
        <Route path='/create_doctor' element={<Create_doctor />} />
        <Route path='/update_doctor' element={<Update_doctor />} />
        <Route path='/update_appointment' element={<Update_appointment />} />
      </Routes>

    </>
  );
}

export default App;
