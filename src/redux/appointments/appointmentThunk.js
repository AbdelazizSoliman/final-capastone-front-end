import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAppointments = createAsyncThunk(
  'reservations/fetchAppointments',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(
        'http://localhost:3000/api/v1/appointments');

      if (resp.status === 200) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const addAppointment = createAsyncThunk(
  'reservations/addAppointment',
  async ({
    city,
    time,
    date,
    doctorId,
  }, thunkAPI) => {
    try {
      const resp = await axios.post(
        'http://localhost:3000/api/v1/appointments',
        {
          city,
          time,
          date,
          doctor_id: doctorId,
        }
      );
      if (resp.status === 201) {
        return resp.data;
      }
      return thunkAPI.rejectWithValue(resp);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export default {
    fetchAppointments,
    addAppointment,
  };