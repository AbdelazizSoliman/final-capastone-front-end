import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const FETCH_DOCTORS_SUCCESS = 'FETCH_DOCTORS_SUCCESS';
const url = 'http://localhost:3000/api/v1/doctors';

export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (thunkAPI) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({ error: e.message });
  }
});

export default fetchDoctors;
