import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenses';
import incomesReducer from './incomes';

const store = configureStore({
    reducer: { expense: expenseReducer, incomes: incomesReducer }
})

export default store;