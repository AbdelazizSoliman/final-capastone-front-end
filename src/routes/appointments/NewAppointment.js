import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createNewAppointment } from '../../redux/appointments/appointmentThunk';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';

const NewAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({
    doctorName: '', // Selected doctor's name
    date: '',
    time: '',
    city: '',
  });
  const { doctors } = useSelector((store) => store.doctors);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (doctors.length === 0) {
      // Dispatch an action to fetch the list of doctors if needed
     dispatch(fetchDoctors());
    }
  }, [dispatch, doctors]);

  const handleCreateAppointment = async (e) => {
    e.preventDefault();

    if (
      appointmentData.date.length === 0 ||
      appointmentData.time.length === 0 ||
      appointmentData.city.length === 0 ||
      appointmentData.doctorName.length === 0
    ) {
      toast.warn('Please fill in all fields');
      return;
    }

    // Find the doctor object by name
    const selectedDoctor = doctors.find((doctor) => doctor.name === appointmentData.doctorName);

    if (!selectedDoctor) {
      toast.warn('Selected doctor not found');
      return;
    }

    // Extract the doctor's ID
    const doctorId = selectedDoctor.id;

    try {
      // Dispatch the action to create a new appointment
      dispatch(createNewAppointment({ ...appointmentData, doctor_id: doctorId }));

      // Reset the form
      setAppointmentData({
        doctorName: '',
        date: '',
        time: '',
        city: '',
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
                name="date"
                value={appointmentData.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Time of Appointment</label>
              <input
                type="time"
                className="form-control"
                name="time"
                value={appointmentData.time}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Select a City</label>
              <select
                className="form-select"
                name="city"
                value={appointmentData.city}
                onChange={handleInputChange}
              >
                <option value="">Select a city</option>
                <option value="City1">Cairo</option>
                <option value="City2">Marrakech</option>
                {/* Add more cities as needed */}
              </select>
            </div>
            <div className="form-group">
              <label>Select a Doctor</label>
              <select
                className="form-select"
                name="doctorName"
                value={appointmentData.doctorName}
                onChange={handleInputChange}
              >
                <option value="">Select a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
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
    </div>
  );
};

export default NewAppointment;
