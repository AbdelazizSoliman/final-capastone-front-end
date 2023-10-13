import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchAppointments from '../../redux/appointments/appointmentThunk';
import SideNav from '../../components/home/SideNav';

const AppointmentsList = () => {
  const dispatch = useDispatch();

  const appointmentsArray = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    if (appointmentsArray.length === 0) {
      dispatch(fetchAppointments());
    }
  }, [dispatch, appointmentsArray]);

  return (
    <div className="h-screen  d-flex align-items-center justify-content-center">
      <SideNav />
      <div>
        <h3 className="text-primary">Appointments List</h3>
        <ul className="list-group">
          {appointmentsArray.map((appointment) => (
            <li key={appointment.id} className="list-group-item">
              <h5 className="text-info">Appointment Details:</h5>
              <p><strong className="text-warning">Date:</strong> {appointment.date_of_appointment}</p>
              <p><strong className="text-success">Time:</strong> {appointment.time_of_appointment}</p>
              <p><strong className="text-primary">City:</strong> {appointment.city}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AppointmentsList;
