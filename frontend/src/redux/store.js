import { configureStore } from '@reduxjs/toolkit';
import constantsReducer from './reducers/constantsSlice'; // Import the reducer
import tabReducer from './reducers/tabSlice';



export const store = configureStore({
  reducer: {
    constants: constantsReducer,
    tab:tabReducer
  },
});