import React, { useState } from "react";

import { months } from "../../helpers/variables.js";

import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import { dateActions } from "../../store/date.js";

const Filter = () => {
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const stateMonth = monthDate + 1;
  const stateDate = monthDate > 9 ? yearDate + '-' + stateMonth : yearDate + '-0' + stateMonth;
  const dispatch = useDispatch();
  const [monthYear, setMonthYear] = useState(stateDate);

  let monthOptions = [];

  months.forEach((month, i) =>
    monthOptions.push(
      <option value={i} id={i} key={i}>
        {month}
      </option>
    )
  );

  return (
    <>
      <h2>Filter Stats</h2>
      <div className="filter__controls">
        <div className="filter__control">
          <input
            type="month"
            min="2015-01"
            value={monthYear}
            onChange={(e) => {
              setMonthYear(e.target.value);
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
