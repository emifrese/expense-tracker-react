import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  /*const expenseDate = new Date(2021, 2, 28);
    const expenseTitle = 'Car Insurance';
    const expenseAmount = 294.67;*/

  /*function eraseItem() {
    props.onErasedExpense(props.date.getTime());
    console.log(typeof props.date.getTime());
  }*/

  const deleteHandler = () => {
    props.onDeleteExpense3(props.id);
  };

  //console.log("ExpenseItem evaluated by React"); // Esto demuestra que cada useState es independiente

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate month={props.month} year={props.year} day={props.day}/>
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <button
            type="button"
            className="expense-item__erase"
            onClick={deleteHandler}
          >
            Erase
          </button>
          <div className="expense-item__price">${props.amount}</div>
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
