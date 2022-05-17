import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, Fragment } from "react";

import { expenseActions } from "./store/expenses";

import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import SignIn from "./components/UI/SignIn";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Incomes from "./components/Incomes/Incomes";
import { incomesActions } from "./store/incomes";
import Card from "./components/UI/Card";
import Test from "./components/Test/Test";
import CurrentMoney from "./components/CurrentMoney/CurrentMoney";

function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses);
  const income = useSelector((state) => state.incomes.incomes);
  console.log(expense);
  //Poner opcion para cargar categorias y despues guardarlas en firebase
  const categories = ["All", "Carniceria", "Verduleria"];

  const signOut = () => auth.signOut();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/expense`),
        (snapshot) => {
          dispatch(expenseActions.reset("expenses"));
          let expensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(expenseActions.increment(expensesArray));
        }
      );
      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/income`),
        (snapshot) => {
          dispatch(incomesActions.reset());
          let incomesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(incomesActions.addIncome(incomesArray));
        }
      );
    }
  }, [user, dispatch]);

  const deleteExpenseHandler = async (expenseId) => {
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${expenseId}`)
    );
    dispatch(expenseActions.delete(expenseId));
  };

  return user ? (
    <Fragment>
      {/* {income.length > 0 ? <div>Hay ingresos</div> : ""} */}
      <div>
        <Incomes />
      </div>
      <div>
        <CurrentMoney />
      </div>
      <div>
        <NewExpense categories={categories} />

        {expense !== null ? (
          <Expenses
            items={expense}
            onDeleteExpense={deleteExpenseHandler}
            categories={categories}
          />
        ) : (
          ""
        )}
      </div>
      <footer>
        <button onClick={signOut}>Sign Out</button>
      </footer>
    </Fragment>
  ) : (
    <SignIn />
  );
}

export default App;
