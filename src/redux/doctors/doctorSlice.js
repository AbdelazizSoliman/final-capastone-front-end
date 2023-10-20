import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDoctors, addDoctor, fetchSpecializations,
  fetchDoctorDetails,
} from './doctorThunk';

const initialState = {
  doctors: [],
  specializations: [],
  isLoading: true,
  error: false,
  errMsg: '',
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addDoctor.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.doctors = action.payload;
        state.error = null;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.addingDoctor = false;
        state.error = action.error.message;
      })
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      })
      .addCase(fetchDoctorDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctorDetails.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchDoctorDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      })
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.specializations = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSpecializations.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch specializations';
      });
  },
});

export default doctorsSlice.reducer;
