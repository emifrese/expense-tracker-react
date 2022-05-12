import { useState } from "react";

import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const actualDate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const [filteredYear, setFilteredYear] = useState(actualDate.getFullYear().toString());
  const [filteredMonth, setFilteredMonth] = useState(months[actualDate.getMonth()]);
  const [filteredCategory, setFilterCategory] = useState(props.categories[0])
  const saveFilterYearHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const saveFilterMonthHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth)
  }

  const saveFilterCategoryHandler = (selectedCategory) => {
    setFilterCategory(selectedCategory)
  }

  const chartExpenses = props.items.filter(expense => {
    return expense.year.toString() === filteredYear
  })

  const filteredExpenses = props.items.filter((expense) => {
    return expense.year.toString() === filteredYear && expense.month.toString() === filteredMonth;
  });

  let categoryExpenses = [];

  if(filteredCategory === "All") {
    categoryExpenses = filteredExpenses;
  } else {
    categoryExpenses = filteredExpenses.filter(expense => {
      return expense.category === filteredCategory
    })
  }

  // Sorting expenses based on the date
  categoryExpenses.sort((a, b) => {
    return a.day - b.day;
}); 

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          onSaveFilterYear={saveFilterYearHandler}
          onSaveFilterMonth={saveFilterMonthHandler}
          onSaveFilterCategory={saveFilterCategoryHandler}
          filteredYear={filteredYear}
          filteredMonth={filteredMonth}
          filteredCategory={filteredCategory}
          months={months}
          categories={props.categories}
        />
        <ExpensesChart expenses={chartExpenses} />
        <ExpensesList 
          items = {categoryExpenses}
          onDeleteExpense2 = {props.onDeleteExpense}
        />
      </Card>
    </div>
  );
}

export default Expenses;
