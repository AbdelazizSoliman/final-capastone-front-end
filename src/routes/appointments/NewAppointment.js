import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewAppointment } from '../../redux/appointments/appointmentThunk';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date_of_appointment: '',
    time_of_appointment: '',
    city: '',
    doctor_id: '', // You may need to provide a doctor's ID here
    patient_id: '', // You may need to provide a patient's ID here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewAppointment(formData));
    history.push('/appointments');
  };

  return (
    <div>
      <h3>Create New Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date of Appointment:</label>
          <input
            type="text"
            name="date_of_appointment"
            value={formData.date_of_appointment}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Time of Appointment:</label>
          <input
            type="text"
            name="time_of_appointment"
            value={formData.time_of_appointment}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Doctor ID:</label>
          <input
            type="text"
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            name="patient_id"
            value={formData.patient_id}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default NewAppointment;
