import { Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import DoctorsList from './components/doctors/DoctorsList';
import DoctorsDetails from './components/doctors/DoctorDetails';
import AddDoctor from './components/doctors/AddDoctor';
import DeleteDoctor from './components/doctors/DeleteDoctor';
import AppointmentsList from './components/appointments/AppointmentsList';
import SideNav from './components/SideNav';
import SpecializationsList from './components/specializations/SpecialisationsList';
import LoginPage from './components/patients/LoginPage';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="App-logo">Logo</div>
      <section className="App">
        <SideNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/doctor/details" element={<DoctorsDetails />} />
          <Route path="/adddoctor" element={<AddDoctor />} />
          <Route path="/deletedoctor" element={<DeleteDoctor />} />
          <Route path="/specializations" element={<SpecializationsList />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
