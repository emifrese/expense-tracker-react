import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, Fragment } from "react";
import { Route, Routes, Switch } from "react-router-dom";

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
import { userActions } from "./store/user";
import Header from "./components/UI/Header";
import Transactions from "./components/Expenses/Transactions";
import NavBar from "./components/UI/NavBar";
import Layout from "./components/UI/Layout";
import ExpenseForm from "./components/NewExpense/ExpenseForm";

function App() {
  const [user, setUser] = useState(null);
  const [fixedCart, setFixedCart] = useState(false);

  const displayName = useSelector((state) => state.user.displayName);
  const email = useSelector((state) => state.user.email);
  const photoURL = useSelector((state) => state.user.photoURL);
  const dispatch = useDispatch();
  //Poner opcion para cargar categorias y despues guardarlas en firebase
  

  const signOut = () => auth.signOut();
  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      const [displayName, email, photoURL] = [
        user.displayName,
        user.email,
        user.photoURL,
      ];
      dispatch(userActions.setUserInfo([displayName, email, photoURL]));
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
      // toggleFixedCartHandler();
    }
  }, [user, dispatch]);

  return user ? (
    <Layout>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <ExpensesList fixed={true} Toggle={toggleFixedCartHandler} />
        </Modal>
      )}
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <Header />
              <Incomes />
              <Transactions />
              <NavBar />
            </>
          }
        />
        <Route path="/add" exact element={<ExpenseForm/>} />
      </Routes>
      {/* <div>
        <NewExpense categories={categories} />
        <Expenses categories={categories} />
      </div> */}

      {/* <button onClick={signOut}>Sign Out</button> */}
    </Layout>
  ) : (
    <SignIn />
  );
}

export default App;
