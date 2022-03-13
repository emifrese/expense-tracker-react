import { useState } from "react";
import Card from "../UI/Card";
import "./Expenses.css";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState("2020");

  const saveFilterYearHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    // return expense.date.getFullYear().toString() === filteredYear;
    return expense.year.toString() === filteredYear;
  });

  // useEffect(() => {
  //   return onSnapshot(
  //     collection(firestore, `users/${auth.currentUser.uid}/expense`),
  //     (snapshot) => {
  //       let expensesArray = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
  //       console.log(expensesArray)
  //     }
  //   )
  // })

  

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter
          onSaveFilterYear={saveFilterYearHandler}
          filteredYear={filteredYear}
        />
        <ExpensesChart expenses={filteredExpenses} />
        <ExpensesList 
          items = {filteredExpenses}
          onDeleteExpense2 = {props.onDeleteExpense}
        />
      </Card>
    </div>
  );
}

export default Expenses;
