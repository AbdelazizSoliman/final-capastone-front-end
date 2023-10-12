import { createSlice } from '@reduxjs/toolkit';
import fetchDoctors from './doctorThunk';

const initialState = {
  doctors: [],
  isLoading: true,
  error: false,
  errMsg: '',
};

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.isLoading = false;
      }).addCase(fetchDoctors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload.error;
      });
  },
});

export default doctorsSlice.reducer;
