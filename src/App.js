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
import Test from "./components/Test/Test";
import CurrentMoney from "./components/CurrentMoney/CurrentMoney";
import Modal from "./components/UI/Modal";
import ExpensesList from "./components/Expenses/ExpensesList";

function App() {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
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
      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/fixed-exp`),
        (snapshot) => {
          dispatch(expenseActions.reset("fixedExp"));
          let fixedExpensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(expenseActions.fixedExp(fixedExpensesArray));
        }
      );
    }
  }, [user, dispatch]);

  return user ? (
    <Fragment>
      <Modal>
          <ExpensesList fixed={true} />
      </Modal>
      {/* {income.length > 0 ? <div>Hay ingresos</div> : ""} */}
      <div>
        <Incomes />
      </div>
      <div></div>
      <div>
        <NewExpense categories={categories} />
        <Expenses categories={categories} />
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
