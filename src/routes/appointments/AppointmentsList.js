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
  const numberOfAppointmentsToShow = 3; // Set the number of appointments to show

  useEffect(() => {
    if (appointmentsArr.length === 0) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointmentsArr]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/appointments')
      .then((response) => {
        setAppointmentsArray(response.data);
        setDisplayedAppointments(response.data.slice(0, numberOfAppointmentsToShow)); // Initially display 3 appointments
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const shiftAppointments = (direction) => {
    const increment = direction === 'left' ? -1 : 1;
    const newIndex = (currentIndex + increment + appointmentsArr.length) % appointmentsArr.length;
    setCurrentIndex(newIndex);
    const endIndex = newIndex + numberOfAppointmentsToShow;
    const displayed = [];
    
    for (let i = 0; i < numberOfAppointmentsToShow; i++) {
      const appointment = appointmentsArr[(endIndex + i) % appointmentsArr.length];
      displayed.push(appointment);
    }
    
    setDisplayedAppointments(displayed);
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