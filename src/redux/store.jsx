import { configureStore } from "@reduxjs/toolkit";
import uiReducer from './ui-slice'
import revenueReducer from './revenue-slice'


 const store = configureStore({
    reducer: {
         ui : uiReducer,
         revenue : revenueReducer,
        
    },
});

export default store;

