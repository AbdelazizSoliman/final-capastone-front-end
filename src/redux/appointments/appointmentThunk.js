import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FETCH_APPOINTMENTS_SUCCESS = 'FETCH_APPOINTMENTS_SUCCESS';
const url = 'http://localhost:3000/api/v1/appointments';

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async (_, thunkAPI) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});

export const createNewAppointment = createAsyncThunk(
  'appointments/createNewAppointment',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(url, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export default { fetchAppointments, createNewAppointment };
