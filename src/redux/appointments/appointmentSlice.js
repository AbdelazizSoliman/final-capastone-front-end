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
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload;
        state.isLoading = false;
      }).addCase(fetchAppointments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      });
  },
});

export default appointmentsSlice.reducer;
