import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";

function ExpenseItem(props) {
  const deleteHandler = () => {
    props.onDeleteExpense3(props.id);
  };

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
