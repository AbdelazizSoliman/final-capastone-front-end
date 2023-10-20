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
      dispatch(fetchPatients());
    }
    const params = new URLSearchParams(location.search);
    const doctorNameParam = params.get('doctorName');
    if (doctorNameParam) {
      setAppointmentData({ ...appointmentData, doctorName: doctorNameParam });
    }
  }, [dispatch, location.search, doctors, patients]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (
      appointmentData.date_of_appointment.length === 0 ||
      appointmentData.time_of_appointment.length === 0 ||
      appointmentData.city.length === 0 ||
      appointmentData.doctorName.length === 0 ||
      appointmentData.patientName.length === 0
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

    const doctorId = selectedDoc.id;
    const patientId = selectPat.id;

    try {
      dispatch(
        createNewAppointment({
          ...appointmentData,
          doctor_id: doctorId,
          patient_id: patientId,
        })
      );

      setAppointmentData({
        date_of_appointment: '',
        time_of_appointment: '',
        city: '',
        doctorName: appointmentData.doctorName,
        patientName: '',
      });

      toast.success('Appointment created successfully!', {
        position: toast.POSITION.TOP_CENTER,
      });

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
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <SideNav />
      <div className="d-flex flex-column align-items-center" style={{ width: '80vw' }}>
        <form className="p-4">
          <h2 className="mb-4">Create New Appointment</h2>
          {error && <p className="text-danger">{error}</p>}
          <div className="mb-3">
            <label className="form-label">Date of Appointment</label>
            <input
              type="date"
              className="form-control"
              name="date_of_appointment"
              value={appointmentData.date_of_appointment}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Time of Appointment</label>
            <input
              type="time"
              className="form-control"
              name="time_of_appointment"
              value={appointmentData.time_of_appointment}
              onChange={handleInputChange}
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
            <label className="form-label">Doctor's Name</label>
            <span>{appointmentData.doctorName}</span>
          </div>
          <div className="mb-3">
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
            style={{width: '100%'}}
          >
            Create Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAppointmentForm;
