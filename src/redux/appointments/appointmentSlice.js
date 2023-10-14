import { createSlice } from '@reduxjs/toolkit';
import { fetchAppointments } from './appointmentThunk';

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
      }).addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log(state.error);
        state.errMsg = action.payload.error;
      });
  },
});

export default appointmentsSlice.reducer;
