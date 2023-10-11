import { configureStore } from '@reduxjs/toolkit';

import doctorsReducer from './doctors/doctorSlice';
import appointmentsReducer from './appointments/appointmentSlice';
import patientsReducer from './patients/patientSlice';

const store = configureStore({
  reducer: {
    doctors: doctorsReducer,
    appointments: appointmentsReducer,
    patients: patientsReducer,
  },
});

const doctorsSelector = (state) => state.doctors;
const appointmentsSelector = (state) => state.appointments;
const patientsSelector = (state) => state.patients;

export default store;
export { doctorsSelector, appointmentsSelector, patientsSelector };