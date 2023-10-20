import { createSlice } from '@reduxjs/toolkit';
import { fetchPatients, registerPatient, loginPatient } from './patientThunk';

const initialState = {
  patients: [],
  data: '',
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
      .addCase(registerPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(loginPatient.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(loginPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginPatient.rejected, (action, state) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },
});

export default patientsSlice.reducer;
