import { Routes, Route } from 'react-router-dom';
import Home from './components/Main/Home';
import DoctorsList from './components/doctors/DoctorsList';
import DoctorsDetails from './components/doctors/DoctorDetails';
import AddDoctor from './components/doctors/AddDoctor';
import DeleteDoctor from './components/doctors/DeleteDoctor';
import AppointmentsList from './components/appointments/AppointmentsList';
import SpecializationsList from './components/specializations/SpecialisationsList';
import LoginPage from './components/patients/LoginPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/doctors" element={<DoctorsList />} />
      <Route path="/appointments" element={<AppointmentsList />} />
      <Route path="/doctors/destails" element={<DoctorsDetails />} />
      <Route path="/addnewdoctor" element={<AddDoctor />} />
      <Route path="/deletedoctor" element={<DeleteDoctor />} />
      <Route path="/specializations" element={<SpecializationsList />} />
    </Routes>
  );
}

export default App;
