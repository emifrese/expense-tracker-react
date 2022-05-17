import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter months={months} categories={props.categories} />
        <ExpensesChart />
        <ExpensesList onDeleteExpense2={props.onDeleteExpense} />
      </Card>
    </div>
  );
}

export default Expenses;
