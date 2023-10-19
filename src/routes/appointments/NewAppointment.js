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
    date_of_appointment: '', // Updated field name
    time_of_appointment: '', // Updated field name
    city: '',
    doctor_id: '', // Selected doctor's name
    patient_id: '', // Selected patient's name
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
      appointmentData.date_of_appointment.length === 0 // Updated field name
      || appointmentData.time_of_appointment.length === 0 // Updated field name
      || appointmentData.city.length === 0
      || appointmentData.doctor_id.length === 0
      || appointmentData.patient_id.length === 0
    ) {
      toast.warn('Please fill in all fields');
    }

    if (!appointmentData.patient_id) {
      toast.warn('Selected doctor not found');
      return;
    }

    if (!appointmentData.patient_id) {
      toast.warn('Selected patient not found');
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
        date_of_appointment: '', // Updated field name
        time_of_appointment: '', // Updated field name
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
              name="date_of_appointment" // Updated field name
              value={appointmentData.date_of_appointment} // Updated field name
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <div>Time of Appointment</div>
            <input
              type="time"
              className="form-control"
              name="time_of_appointment" // Updated field name
              value={appointmentData.time_of_appointment} // Updated field name
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <div>Select a City</div>
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
          <div className="form-group">
            <div>Select a Doctor</div>
            <select
              className="form-select"
              name="doctor_id"
              value={appointmentData.doctor_id}
              onChange={handleInputChange}
            >
              <option value="">Select a doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <div>Select a Patient</div>
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
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointment;
