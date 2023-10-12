import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './reducers/homeSlice';

const Store = configureStore({
  reducer: {
    doctors: homeReducer,
  },
});

export default Store;
