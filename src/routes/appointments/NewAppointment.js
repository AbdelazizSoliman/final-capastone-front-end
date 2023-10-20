import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createNewAppointment } from '../../redux/appointments/appointmentThunk';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import { fetchPatients } from '../../redux/patients/patientThunk';
import SideNav from '../../components/home/SideNav';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    date_of_appointment: '',
    time_of_appointment: '',
    city: '',
    doctor_id: '',
    patient_id: '',
  });
  const { doctors } = useSelector((store) => store.doctors);
  const { patients } = useSelector((store) => store.patients);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchDoctors());
    }
    if (patients.length === 0) {
      dispatch(fetchPatients()); // Fetch the list of patients if needed
    }
  }, [dispatch, doctors, patients]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (
      appointmentData.date_of_appointment.length === 0
      || appointmentData.time_of_appointment.length === 0
      || appointmentData.city.length === 0
      || appointmentData.doctor_id.length === 0
      || appointmentData.patient_id.length === 0
    ) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      // Dispatch the action to create a new appointment
      dispatch(
        createNewAppointment({
          ...appointmentData,
          doctor_id: appointmentData.doctor_id,
          patient_id: appointmentData.patient_id,
        }),
      );

      // Reset the form
      setAppointmentData({
        date_of_appointment: '',
        time_of_appointment: '',
        city: '',
        doctor_id: '',
        patient_id: '',
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
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <SideNav />
      <div className="d-flex flex-column align-items-center" style={{ width: '80vw' }}>
        <form className="p-4">
          <h2 className="mb-4">Create New Appointment</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <p className="form-label">Date of Appointment</p>
            <input
              type="date"
              className="form-control"
              name="date_of_appointment"
              value={appointmentData.date_of_appointment}
              onChange={handleInputChange}
              id="date-appointment" // Add the id attribute
            />
          </div>
          <div className="mb-3">
            <p className="form-label">Time of Appointment</p>
            <input
              type="time"
              className="form-control"
              name="time_of_appointment"
              value={appointmentData.time_of_appointment}
              onChange={handleInputChange}
              id="time" // Add the id attribute
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="city"
              value={appointmentData.city}
              onChange={handleInputChange}
            >
              <option value="">Select a city</option>
              <option value="Cairo">Cairo</option>
              <option value="Marrakech">Marrakech</option>
              {/* Add more cities as needed */}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="doctor_id"
              value={appointmentData.doctor_id}
              onChange={handleInputChange}
            >
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="patient_id"
              value={appointmentData.patient_id}
              onChange={handleInputChange}
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.username}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleCreateAppointment}
            style={{ width: '100%' }}
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointment;
