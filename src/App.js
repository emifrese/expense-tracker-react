import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { expenseActions } from "./store/expenses";

import NewExpense from "./components/NewExpense/NewExpense";
import SignIn from "./components/UI/SignIn";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { incomesActions } from "./store/incomes";
import Test from "./components/Test/Test";
import Modal from "./components/UI/Modal";
import { userActions } from "./store/user";
import Layout from "./components/UI/Layout";
import ExpenseForm from "./components/NewExpense/ExpenseForm";
import Stats from "./pages/Stats";
import MainPage from "./pages/MainPage";
import AddTransaction from "./pages/AddTransaction";
import UserManager from "./pages/UserManager";

function App() {
  const [user, setUser] = useState(null);
  const [fixedCart, setFixedCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [homemates] = useSelector((state) => state.user.homemates);

  const dispatch = useDispatch();
  //Poner opcion para cargar categorias y despues guardarlas en firebase

  const signOut = () => auth.signOut();
  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      console.log(user);
      const [displayName, email, photoURL, creationTime] = [
        user.displayName,
        user.email,
        user.photoURL,
        user.metadata.creationTime
      ];
      dispatch(userActions.setUserInfo([displayName, email, photoURL, creationTime]));

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

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/homemates`),
        (snapshot) => {
          dispatch(userActions.resetHomemates());
          let homematesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(userActions.setHomematesInfo(homematesArray));
        }
      );
    }
  }, [user, dispatch]);

  return user ? (
    <Layout>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <p>Gika</p>
        </Modal>
      )}
      <Routes>
        <Route path="/" exact element={<MainPage />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/user" element={<UserManager />} />
      </Routes>
      {/* <button onClick={signOut}>Sign Out</button> */}
    </Layout>
  ) : (
    <SignIn />
  );
}

export default App;
