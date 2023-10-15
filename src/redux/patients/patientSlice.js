import { createSlice } from '@reduxjs/toolkit';
import { fetchPatients } from './patientThunk';

const initialState = {
  patients: [],
  isLoading: true,
  error: false,
  errMsg: '',
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.patients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      })
  },
});

export default patientsSlice.reducer;
