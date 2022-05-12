import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const actualDate = new Date();

  const changeYearHandler = (e) => {
    props.onSaveFilterYear(e.target.value);
  };

  const changeMonthHandler = (e) => {
    props.onSaveFilterMonth(e.target.value);
  };

  const changeCategoryHandler = (e) => {
    props.onSaveFilterCategory(e.target.value);
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
          <select onChange={changeYearHandler} value={props.filteredYear}>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
        <div className="expenses-filter__dateList">
          <label>Filter by month</label>
          <select onChange={changeMonthHandler} defaultValue={actualDate.getMonth()}>
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
