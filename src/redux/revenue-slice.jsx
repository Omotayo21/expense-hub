import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  name: "",
  
  notificationCount: 0,
  revenues: [
    {   id:'',
      name: "",
      amount:0,
    },
  ],

  loading: false,
  error: null,
};
  const revenueSlice = createSlice({
    name: "revenue",
    initialState,
    reducers: {
     
      setLoading(state, action) {
        state.loading = action.payload
      },
       setError(state, action) {
        state.error = action.payload
      },
     
      deleteRevenue(state, action) {
        return state.revenues.filter((revenue) => revenue.id !== action.payload.id);
      },
      setRevenue(state, action) {
        state.revenues = action.payload;
      },
      addRevenue(state, action) {
        state.revenues.push(action.payload);
      },
      
      incrementNotificationCount(state) {
        state.notificationCount += 1;
      },
      resetNotificationCount(state) {
        state.notificationCount = 0;
      },
     addRevenueFailure(state, action) {
        state.error = action.payload
        
      },
    },
 
  });

 export const {addRevenue, addRevenueFailure, deleteRevenue, setRevenue, incrementNotificationCount, } = revenueSlice.actions;
 export default revenueSlice.reducer;