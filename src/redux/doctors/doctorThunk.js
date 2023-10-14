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

export const addDoctor = createAsyncThunk(
  'doctors/addDoctor',
  async (doctorInfo) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/doctors',
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
