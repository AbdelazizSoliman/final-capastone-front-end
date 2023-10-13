import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  ready: true,
  errors: null,
  addSuccess: false,
};

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setReady: (state, action) => {
      state.ready = action.payload;
    },
    setAddSuccess: (state, action) => {
      state.addSuccess = action.payload;
    },
  },
});

export const { setAppointments, setErrors, setReady, setAddSuccess } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
