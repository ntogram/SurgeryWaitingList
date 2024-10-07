import { configureStore } from '@reduxjs/toolkit';
import constantsReducer from './constantsSlice'; // Import the reducer

export const store = configureStore({
  reducer: {
    constants: constantsReducer, // Add your slice here
  },
});