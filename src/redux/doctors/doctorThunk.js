import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/doctors';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (thunkAPI) => {
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

export const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async (doctorInfo) => {
    try {
      const response = await axios.post(
        `${url}`,
        doctorInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to add doctor');
    }
  },
);

export const fetchSpecializations = createAsyncThunk('doctors/fetchSpecializations', async (thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/specializations');
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});

export const fetchDoctorDetails = createAsyncThunk('doctors/fetchDoctorDetails', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/doctors/${id}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});
