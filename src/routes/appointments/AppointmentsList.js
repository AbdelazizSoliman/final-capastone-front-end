import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchAppointments } from '../../redux/appointments/appointmentThunk';
import SideNav from '../../components/home/SideNav';

const AppointmentsList = () => {
  const dispatch = useDispatch();
  const [appointmentsArr, setAppointmentsArray] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (appointmentsArr.length === 0 || appointmentsArr.length === undefined) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointmentsArr]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/appointments')
      .then((response) => {
        setAppointmentsArray(response.data);
        setDisplayedAppointments(response.data.slice(0, 3));
      })
      .catch((error) => {
        throw new Error(error.response?.data?.error || 'Failed to fetch appointments');
      });
  }, []);

  const shiftAppointments = (direction) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (currentIndex + increment + appointmentsArr.length) % appointmentsArr.length;
    setCurrentIndex(newIndex);
    const endIndex = newIndex + 3 >= appointmentsArr.length ? appointmentsArr.length : newIndex + 3;
    setDisplayedAppointments(appointmentsArr.slice(newIndex, endIndex));
  };

  return (
    <div className="d-flex" style={{ width: '100vw' }}>
      <SideNav />
      <div className="d-flex flex-column align-items-center gap-4 mt-5" style={{ width: '80vw' }}>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='fw-bold'>Appointments List</h1>
          <p className='text-secondary'>Here are your appointments</p>
        </div>
        <div className="slideshow d-flex align-items-center" style={{ width: '100%' }}>
          <button
            type="button"
            className="btn btn-light slide-button m-2"
            onClick={() => shiftAppointments('left')}
            aria-label="Slide left"
            style={{ height: '10vh', width: '8%' }}
          >
            <i className="fa fa-chevron-left pl-3" />
          </button>
          <div className="slideshowSlider d-flex gap-2" id="slider" style={{ width: '80%' }}>
            {displayedAppointments.map((appointment) => (
              <div className="card m-2 p-3 d-flex flex-column gap-4" style={{ width: '300px' }}>
                <h5 className="card-title text-info">Appointment Details</h5>
                <p className="card-text">
                  <strong className="text-warning">Date:</strong>
                  {' '}
                  {appointment.date_of_appointment}
                </p>
                <p className="card-text">
                  <strong className="text-warning">Time:</strong>
                  {' '}
                  {appointment.time_of_appointment}
                </p>
                <p className="card-text">
                  <strong className="text-warning">City:</strong>
                  {' '}
                  {appointment.city}
                </p>
                <p className="card-text">
                  <strong className="text-warning">Doctor:</strong>
                  {' '}
                  {appointment.doctor_name}
                </p>
                <p className="card-text">
                  <strong className="text-warning">Patient:</strong>
                  {' '}
                  {appointment.patient_name}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="btn btn-light slide-button m-2"
            onClick={() => shiftAppointments('right')}
            aria-label="Slide right"
            style={{ height: '10vh', width: '8%' }}
          >
            <i className="fa fa-chevron-right pl-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
