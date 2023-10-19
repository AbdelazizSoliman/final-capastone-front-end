import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/patients';

export const loginPatient = createAsyncThunk(
  'patients/loginPatient',
  async (userInfo) => {
    try {
      const response = await axios.post(`${url}/login`, userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const token = response.headers.authorization.split('Bearer ')[1];
        localStorage.setItem('token', token);
        localStorage.setItem('user', userInfo.username);
      }
    } catch (e) {
      throw new Error(e.response?.data?.error || 'Failed to add doctor');
    }
  },
);

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async (thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});

export const registerPatient = createAsyncThunk(
  'patients/registerPatient',
  async (userInfo) => {
    try {
      const response = await axios.post(`${url}`, userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to register');
    }
  },
);

export default { fetchPatients, registerPatient, loginPatient };
