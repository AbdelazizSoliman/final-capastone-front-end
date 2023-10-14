import { createSlice } from '@reduxjs/toolkit';
import { fetchDoctors, addDoctor, fetchSpecializations } from './doctorThunk';

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
      .addCase(addDoctor.fulfilled, (state) => {
        state.isLoading = true;
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
      .addCase(fetchSpecializations.fulfilled, (state, action) => {
        state.specializations = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSpecializations.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchSpecializations.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch specializations';
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      });
  },
});

export default doctorsSlice.reducer;
