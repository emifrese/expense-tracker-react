import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expenses";
import incomesReducer from "./incomes";
import dateReducer from "./date";
import userReducer from "./user";

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    incomes: incomesReducer,
    date: dateReducer,
    user: userReducer,
  },
});

export default store;
