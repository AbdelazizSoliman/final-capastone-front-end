import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createNewAppointment } from '../../redux/appointments/appointmentThunk';
import { fetchPatients } from '../../redux/patients/patientThunk';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';

const NewAppointmentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [appointmentData, setAppointmentData] = useState({
    date_of_appointment: '',
    time_of_appointment: '',
    city: '',
    doctorName: '', // Selected doctor's name
    patientName: '',
  });
  const { doctors } = useSelector((store) => store.doctors);
  const { patients } = useSelector((store) => store.patients);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (doctors.length === 0 || doctors.length === undefined) {
      dispatch(fetchDoctors());
    }
    if (patients.length === 0 || patients.length === undefined) {
      dispatch(fetchPatients()); // Fetch the list of patients if needed
    }
    const params = new URLSearchParams(location.search);
    const doctorNameParam = params.get('doctorName');
    if (doctorNameParam) {
      // Autofill the doctor's name
      setAppointmentData({ ...appointmentData, doctorName: doctorNameParam });
    }
  }, [dispatch, location.search, doctors, patients]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (
      appointmentData.date_of_appointment.length === 0
      || appointmentData.time_of_appointment.length === 0
      || appointmentData.city.length === 0
      || appointmentData.doctorName.length === 0
      || appointmentData.patientName.length === 0
    ) {
      toast.warn('Please fill in all fields');
      return;
    }

    const selectedDoc = doctors.find((doctor) => doctor.name === appointmentData.doctorName);
    const selectPat = patients.find((patient) => patient.name === appointmentData.patientName);

    if (!selectedDoc) {
      toast.warn('Selected doctor not found');
      return;
    }

    if (!selectPat) {
      toast.warn('Selected patient not found');
      return;
    }

    // Extract the doctor's ID
    const doctorId = selectedDoc.id;
    const patientId = selectPat.id;

    try {
      // Dispatch the action to create a new appointment
      // ...
      dispatch(
        createNewAppointment({ ...appointmentData, doctor_id: doctorId, patient_id: patientId }),
      );

      // Reset the form
      setAppointmentData({
        date_of_appointment: '',
        time_of_appointment: '',
        city: '',
        doctorName: appointmentData.doctorName, // Preserve the doctor's name
        patientName: '',
      });

      toast.success('Appointment created successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

      // Redirect to the appointment list page or any other page as needed
      navigate('/appointments');
    } catch (err) {
      setError(err.message || 'Error creating appointment. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-green">
      <SideNav />
      <div className="home_component">
        <form>
          <h2>Create New Appointment</h2>
          {error && <p>{error}</p>}
          <div className="form-group">
            <div>Date of Appointment</div>
            <input
              type="date"
              className="form-control"
              name="date_of_appointment"
              value={appointmentData.date_of_appointment}
              onChange={(e) => setAppointmentData({ ...appointmentData, date_of_appointment: e.target.value })}
            />
          </div>
          <div className="form-group">
            <div>Time of Appointment</div>
            <input
              type="time"
              className="form-control"
              name="time_of_appointment"
              value={appointmentData.time_of_appointment}
              onChange={(e) => setAppointmentData({ ...appointmentData, time_of_appointment: e.target.value })}
            />
          </div>
          <div className="form-group">
            <div>Select a City</div>
            <select
              className="form-select"
              name="city"
              value={appointmentData.city}
              onChange={(e) => setAppointmentData({ ...appointmentData, city: e.target.value })}
            >
              <option value="">Select a city</option>
              <option value="Cairo">Cairo</option>
              <option value="Marrakech">Marrakech</option>
              {/* Add more cities as needed */}
            </select>
          </div>
          <div className="form-group">
            <div>Doctor's Name</div>
            <span>{appointmentData.doctorName}</span>
          </div>

          <div className="form-group">
            <div>Select a Patient</div>
            <select
              className="form-select"
              name="patientName"
              value={appointmentData.patientName}
              onChange={handleInputChange}
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.name}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleCreateAppointment}
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentForm;
