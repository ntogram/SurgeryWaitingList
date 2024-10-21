// global variable for selected tab
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    //Retrieve the last selected tab from localStorage, or if there is noone selectedd, pick thhe default tab 'patientInsertion'
    selectedTab: localStorage.getItem('selectedTab') || 'patientInsertion',
    refreshTab: null
  };
  
  const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
      setTab: (state, action) => {
        state.selectedTab = action.payload;// change value of tab
        localStorage.setItem('selectedTab', action.payload); // Store it  in localStorage
      },
      setRefreshTab: (state, action) => {
        state.refreshTab = action.payload;  // Update refreshTab with the tab name
      },
      resetRefreshTab: (state) => {
        state.refreshTab = null;  // Reset refreshTab to null
      }

    },
  });
  
  export const { setTab,setRefreshTab,resetRefreshTab} = tabSlice.actions;
  export default tabSlice.reducer;
  