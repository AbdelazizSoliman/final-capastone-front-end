import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
import { fetchAppointments } from '../../redux/appointments/appointmentThunk';
import SideNav from '../../components/home/SideNav';

const AppointmentsList = () => {
  const dispatch = useDispatch();
  const displayedAppointments = useSelector((state) => state.appointments.appointments);

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    slider.scrollLeft += 500;
  };

  useEffect(() => {
    if (displayedAppointments.length === 0) {
      dispatch(fetchAppointments());
    }
  }, [dispatch]);

  return (
    <div className="d-flex w-100 align-items-center justify-content-center bg-green">
      <SideNav />
      <div className="home_component">
        <button type="button" className="flex" onClick={slideLeft} aria-label="Slide left"><i className="fa fa-chevron-left" style={{ fontSize: '2em', color: '#25c804' }} /></button>
        <div className="slideshowSlider" id="slider">
          <ul className="d-flex">
            {displayedAppointments.map((appointment) => (
              <li key={appointment.id} className="list-group-item m-2 p-2 border" style={{ width: '300px' }}>
                <h5 className="text-info">Appointment Details:</h5>
                <p>
                  <strong className="text-warning">Date:</strong>
                  {' '}
                  {appointment.date_of_appointment}
                </p>
                <p>
                  <strong className="text-success">Time:</strong>
                  {' '}
                  {appointment.time_of_appointment}
                </p>
                <p>
                  <strong className="text-primary">City:</strong>
                  {' '}
                  {appointment.city}
                </p>
                <p>
                  <strong className="text-primary">Doctor:</strong>
                  {' '}
                  {appointment.doctor_name}
                </p>
                <p>
                  <strong className="text-primary">Patient:</strong>
                  {' '}
                  {appointment.patient_name}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="flex" onClick={slideRight} aria-label="Slide Right"><i className="fa fa-chevron-right" style={{ fontSize: '2em', color: '#25c804' }} /></button>
      </div>
    </div>
  );
};

export default AppointmentsList;
