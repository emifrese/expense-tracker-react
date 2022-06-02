import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenses';
import incomesReducer from './incomes';
import dateReducer from './date'

const store = configureStore({
    reducer: { expense: expenseReducer, incomes: incomesReducer, date: dateReducer }
})

export default store;