import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { expenseActions } from "../../store/expenses";
import { useDispatch } from "react-redux";

function ExpenseItem(props) {

  const dispatch = useDispatch();

  const deleteExpenseHandler = async (expenseId) => {
    console.log(expenseId)
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${expenseId}`)
    );
    dispatch(expenseActions.delete(expenseId));
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
            onClick={() => deleteExpenseHandler(props.id)}
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
