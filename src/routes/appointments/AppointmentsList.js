import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../redux/appointments/appointmentThunk';
import { fetchDoctors } from '../../redux/doctors/doctorThunk';
import SideNav from '../../components/home/SideNav';

const AppointmentsList = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((store) => store.appointments);
  const { doctors } = useSelector((store) => store.doctors);

  useEffect(() => {
    if (!appointments.length) dispatch(fetchAppointments());
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, appointments.length, doctors.length]);

  const newReservationArray = [];
  appointments.forEach((appointment) => {
    doctors.forEach((doctor) => {
      if (appointment.doctor_id === doctor.id) {
        const dateObject = new Date(appointment.time);
        const timeOptions = {
          hour: '2-digit',
          minute: '2-digit',
        };
        const formattedTime = dateObject.toLocaleTimeString('en-US', timeOptions);
        const newReservationObject = {
          doctor: doctor.name,
          time: formattedTime,
          date: appointment.date,
          city: appointment.city,
          // id: appointment.id,
        };
        newReservationArray.push(newReservationObject);
      }
    });
  });

  return (
    <div className="w-full">
       <SideNav />
      <h1 className="text-center mb-10 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">MY RESERVATIONS</h1>
      <ul className="w-100">
        {
          newReservationArray.map((appointment, index) => (
            <li key={appointment.id} className="bg-yellow-100 mb-3 p-5">
              <h2 className="text-[35px] font-bold">
                {index + 1}
                .
              </h2>
              <h3 className="flex gap-2">
                <b>Appointment with:</b>
                <span>
                  {appointment.doctor}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>City:</b>
                <span>
                  {appointment.city}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>Appointment Date:</b>
                <span>
                  {appointment.date}
                </span>
              </h3>
              <h3 className="flex gap-2">
                <b>Appointment Time:</b>
                <span>
                  {appointment.time}
                </span>
              </h3>
            </li>
          ))
        }
        {
          newReservationArray.length === 0 && (
            <li className="bg-yellow-100 p-5">
              <h2 className="mb-3 font-bold" style={{ color: 'purple' }}>
                You have no appointments yet.
              </h2>
              <Link to="/appointments/new">Reserve a doctor</Link>
            </li>
          )
        }
      </ul>
    </div>
  );
};

export default AppointmentsList;
