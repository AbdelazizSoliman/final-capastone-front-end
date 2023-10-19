import { createSlice } from '@reduxjs/toolkit';
import { fetchPatients, registerPatient } from './patientThunk';

const initialState = {
  patients: [],
  token: '',
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
        state.token = action.payload;
        state.isLoading = false;
      })
      .addCase(registerPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      });
  },
});

export default patientsSlice.reducer;
