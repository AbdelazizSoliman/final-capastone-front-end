import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createNewAppointment } from '../../redux/appointments/appointmentThunk';
import SideNav from '../../components/home/SideNav';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [appointmentInfo, setAppointmentInfo] = useState({
    date_of_appointment: '',
    time_of_appointment: '',
    city: '',
    doctor_id: '',
    patient_id: '', // Replace with the actual patient ID
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentInfo({ ...appointmentInfo, [name]: value });
  };

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (
      appointmentInfo.date_of_appointment.length === 0 ||
      appointmentInfo.time_of_appointment.length === 0 ||
      appointmentInfo.city.length === 0 ||
      appointmentInfo.doctor_id.length === 0 ||
      appointmentInfo.patient_id.length === 0
    ) {
      toast.warn('Please fill in all fields');
      return;
    }

    try {
      // Dispatch the action to create a new appointment
      dispatch(createNewAppointment(appointmentInfo));

      // Reset the form
      setAppointmentInfo({
        date_of_appointment: '',
        time_of_appointment: '',
        city: '',
        doctor_id: '',
        patient_id: '', // Replace with the actual patient ID
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

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
        <SideNav />
        </div>
        <div className="col-md-4">
          <form>
            <h2>Create New Appointment</h2>
            {error && <p>{error}</p>}
            <div className="form-group">
              <label>Date of Appointment</label>
              <input
                type="date"
                className="form-control"
                name="date_of_appointment"
                value={appointmentInfo.date_of_appointment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Time of Appointment</label>
              <input
                type="time"
                className="form-control"
                name="time_of_appointment"
                value={appointmentInfo.time_of_appointment}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={appointmentInfo.city}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Doctor ID</label>
              <input
                type="text"
                className="form-control"
                name="doctor_id"
                value={appointmentInfo.doctor_id}
                onChange={handleChange}
              />
            </div>
            {/* Replace the following input with the actual patient ID */}
            <div className="form-group">
              <label>Patient ID</label>
              <input
                type="text"
                className="form-control"
                name="patient_id"
                value={appointmentInfo.patient_id}
                onChange={handleChange}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleCreateAppointment}>
              Create Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;
