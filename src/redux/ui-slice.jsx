import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  name: "",
  darkMode: false,
  expenses: [
    {
      category: "Food",
      name: "rahmannnn",
      amount: 9000,
    },
  ],
  notificationCount: 0,
  revenues: [
    {
      name: "rahmannnn",
      amount: 9000,
    },
  ],
  budgets : [],
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
      addExpense(state, action) {
        state.expenses.push(action.payload);
      },
      addRevenue(state, action) {
        state.revenues.push(action.payload);
      },
      addBudget(state, action) {
        state.budgets.push(action.payload);
      },
      incrementNotificationCount(state) {
        state.notificationCount += 1;
      },
      resetNotificationCount(state) {
        state.notificationCount = 0;
      },
      fetchExpensesStart(state) {
        state.loading = true;
        state.error = null;
      },
      fetchExpensesSuccess(state, action) {
        state.loading = false;
        state.error = null;
        state.expenses = action.payload;
      },
      fetchExpensesFailure(state, action) {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

 export const { setDarkMode,setExpenses, addExpense, incrementNotificationCount, resetNotificationCount, addRevenue,addBudget} = uiSlice.actions;
 export default uiSlice.reducer;