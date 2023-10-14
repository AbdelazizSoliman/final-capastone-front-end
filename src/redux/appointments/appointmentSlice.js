import { createSlice } from '@reduxjs/toolkit';
import { fetchAppointments, createNewAppointment } from './appointmentThunk'; // Import createNewAppointment

const initialState = {
  appointments: [],
  isLoading: true,
  error: false,
  errMsg: '',
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.isLoading = true;
        console.log(state.isLoading);
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        console.log(state.appointments);
        state.isLoading = false;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log(state.error);
        state.errMsg = action.payload.error;
      })
      .addCase(createNewAppointment.pending, (state) => { // Add createNewAppointment cases
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createNewAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createNewAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      });
  },
});

export default appointmentsSlice.reducer;
