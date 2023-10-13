import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FETCH_DOCTORS_SUCCESS = 'FETCH_DOCTORS_SUCCESS';
const url = 'http://localhost:3000/api/v1/doctors';

const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});

export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (doctorId, thunkAPI) => {
  try {
    // Make an API call to delete the doctor by ID using Axios
    await axios.delete(`${url}/${doctorId}`);

    return doctorId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export default fetchDoctors;
