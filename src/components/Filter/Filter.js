import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { dateActions } from "../../store/date.js";
import { incomesActions } from "../../store/incomes.js";
import { expenseActions } from "../../store/expenses.js";

import classes from './Filter.module.css'

const Filter = () => {
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const stateMonth = monthDate + 1;
  const stateDate =
    monthDate > 9 ? yearDate + "-" + stateMonth : yearDate + "-0" + stateMonth;
  const dispatch = useDispatch();
  const [monthYear, setMonthYear] = useState(stateDate);


  return (
    <>
      <h2>Filter Stats</h2>
      <div className={classes.filterControls}>
        <div className={classes.filterControl}>
          <input
            type="month"
            min="2015-01"
            value={monthYear}
            onChange={(e) => {
              console.log(e.target.value);
              setMonthYear(e.target.value);
              dispatch(
                incomesActions.filterIncomes([
                  [],
                  parseInt(e.target.value.substring(5)) - 1,
                  parseInt(e.target.value.slice(0, 4)),
                ])
              );

              dispatch(
                expenseActions.filterExpenses([
                  [],
                  parseInt(e.target.value.substring(5)) - 1,
                  parseInt(e.target.value.slice(0, 4)),
                ])
              );
              dispatch(
                dateActions.setMonth(parseInt(e.target.value.substring(5)) - 1)
              );
              dispatch(
                dateActions.setYear(parseInt(e.target.value.slice(0, 4)))
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
