import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { fetchAppointments } from '../../redux/appointments/appointmentThunk';
import SideNav from '../../components/home/SideNav';

const AppointmentsList = () => {
  const dispatch = useDispatch();
  const [appointmentsArray, setAppointmentsArray] = useState([]);
  const [displayedAppointments, setDisplayedAppointments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (appointmentsArray.length === 0) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointmentsArray]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/appointments')
      .then((response) => {
        setAppointmentsArray(response.data);
        setDisplayedAppointments(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const shiftAppointments = (direction) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (currentIndex + increment + appointmentsArray.length) % appointmentsArray.length;
    setCurrentIndex(newIndex);
    const endIndex = newIndex + 3 >= appointmentsArray.length ? appointmentsArray.length : newIndex + 3;
    setDisplayedAppointments(appointmentsArray.slice(newIndex, endIndex));
  };

  return (
    <div className="h-screen d-flex">
      <SideNav />

      <div className="p-4" style={{ flex: '1' }}>
        <h3 className="text-primary">Appointments List</h3>
        <div className="d-flex align-items-center" style={{ overflowY: 'hidden' }}>
          <button className="btn btn-link" type="button" onClick={() => shiftAppointments('left')}>
            <i className="fa fa-chevron-left" style={{ fontSize: '1.5em', color: '#25c804' }} />
          </button>
          <div className="horizontal-scroll" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            <ul className="list-group d-flex flex-row">
              {displayedAppointments.map((appointment) => (
                <li key={appointment.id} className="list-group-item m-2 p-2" style={{ width: '300px' }}>
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
          <button className="btn btn-link" type="button" onClick={() => shiftAppointments('right')}>
            <i className="fa fa-chevron-right" style={{ fontSize: '2em', color: '#25c804' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
