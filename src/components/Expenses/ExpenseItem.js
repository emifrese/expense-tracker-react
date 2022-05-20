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
    console.log(expenseId);
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${expenseId}`)
    );
    dispatch(expenseActions.delete(expenseId));
  };

  let amountContent = !props.day ? (
    <>
      <button>Change Amount</button>
      <input
        value={props.amount}
        type="number"
        className="expense-item__price"
      />
    </>
  ) : (
    <div className="expense-item__price">${props.amount}</div>
  );

  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate month={props.month} year={props.year} day={props.day} />
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <button
            type="button"
            className="expense-item__erase"
            onClick={() => deleteExpenseHandler(props.id)}
          >
            Erase
          </button>
          {/* <div className="expense-item__price">${props.amount}</div> */}
          {/* <input value={props.amount} type="number" className="expense-item__price"/> */}
          {amountContent}
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;
