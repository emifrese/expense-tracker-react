import "./ExpensesFilter.css";

import { useDispatch, useSelector } from "react-redux";

import { expenseActions } from "../../store/expenses";
import { dateActions } from "../../store/date";

const ExpensesFilter = (props) => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const category = useSelector((state) => state.expense.category);

  const changeYearHandler = (e) => {
    dispatch(dateActions.setYear(parseInt(e.target.value)));
  };

  const changeMonthHandler = (e) => {
    dispatch(dateActions.setMonth(parseInt(e.target.value)));
  };

  const changeCategoryHandler = (e) => {
    dispatch(expenseActions.setCategory(e.target.value));
  };

  let monthList = [];

  props.months.forEach((month, i) => {
    monthList.push(
      <option key={i} value={i}>
        {month.slice(0, 3)}
      </option>
    );
  });

  let categoryList = [];

  props.categories.forEach((category, i) => {
    categoryList.push(
      <option key={i} value={category}>
        {category}
      </option>
    );
  });

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <div className="expenses-filter__dateList">
          <label>Filter by year</label>
          <select onChange={changeYearHandler} value={yearDate}>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
          </select>
        </div>
        <div className="expenses-filter__dateList">
          <label>Filter by month</label>
          <select onChange={changeMonthHandler} value={monthDate}>
            {monthList}
          </select>
        </div>
        <div className="expenses-filter__categoryList">
          <label>Filter by category</label>
          <select onChange={changeCategoryHandler}>{categoryList}</select>
        </div>
      </div>
    </div>
  );
};

export default ExpensesFilter;
