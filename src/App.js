import { Route, Routes } from 'react-router-dom';
import Home from './routes/doctors/DoctorsList';
import DoctorsDetails from './routes/doctors/DoctorDetails';
import AddDoctor from './routes/doctors/AddDoctor';
import DeleteDoctor from './routes/doctors/DeleteDoctor';
import AppointmentsList from './routes/appointments/AppointmentsList';
import NewAppointment from './routes/appointments/NewAppointment';
import LoginPage from './components/patients/LoginPage';
import './App.css';

function App() {
  return (
    <div className="container">
      <div className="App-logo">Logo</div>
      <section className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<NewAppointment />} />
          <Route path="/doctor/details" element={<DoctorsDetails />} />
          <Route path="/doctors/new" element={<AddDoctor />} />
          <Route path="/doctors/delete" element={<DeleteDoctor />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
