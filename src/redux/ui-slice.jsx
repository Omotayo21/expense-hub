import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




const initialState = {
  name: "",
  darkMode: false,
  expenses: [
    {
      id: '',
      category: "",
      name: "",
      amount: 0,
    },
  ],
  notificationCount: 0,

  loading: false,
  error: null,
};
  const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
      setDarkMode(state) {
        state.darkMode = !state.darkMode;
      },
      setExpenses(state, action) {
        state.expenses = action.payload;
      },
      setLoading(state, action) {
        state.loading = action.payload
      },
       setError(state, action) {
        state.error = action.payload
      },
      addExpense(state, action) {
        state.expenses.push(action.payload);
      },
      addExpenseFailure(state, action) {
        state.error = action.payload
        
      },
       deleteExpense : (state, action) => {
       return  state.expenses.filter((expense) => expense.id !== action.payload.id);
      },
     
      
      
      
      incrementNotificationCount(state) {
        state.notificationCount += 1;
      },
      resetNotificationCount(state) {
        state.notificationCount = 0;
      },
     
    },
  
  });

 export const { setDarkMode, setExpenses, addExpense, incrementNotificationCount,addExpenseFailure, resetNotificationCount,  deleteExpense, setLoading, setError} = uiSlice.actions;
 export default uiSlice.reducer;