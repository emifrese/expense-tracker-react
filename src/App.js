import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { expenseActions } from "./store/expenses";

import { collection, onSnapshot } from "firebase/firestore";
import { incomesActions } from "./store/incomes";
import { userActions } from "./store/user";
import Layout from "./components/UI/Layout";
import Stats from "./pages/Stats";
import MainPage from "./pages/MainPage";
import AddTransaction from "./pages/AddTransaction";
import UserManager from "./pages/UserManager";
import Sign from "./components/UI/Sign";

const actualDate = new Date();

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      const [displayName, email, photoURL, creationTime] = [
        user.displayName,
        user.email,
        user.photoURL,
        user.metadata.creationTime,
      ];
      dispatch(
        userActions.setUserInfo([displayName, email, photoURL, creationTime])
      );

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/expense`),
        (snapshot) => {
          let expensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(expenseActions.increment(expensesArray));
          dispatch(
            expenseActions.filterExpenses([
              expensesArray,
              actualDate.getMonth(),
              actualDate.getFullYear(),
            ])
          );
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
          dispatch(incomesActions.filterIncomes([incomesArray, actualDate.getMonth(), actualDate.getFullYear()]))
        }
      );

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/fixed-exp`),
        (snapshot) => {
          let fixedExpensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(
            expenseActions.fixedExp([
              fixedExpensesArray,
              actualDate.getFullYear(),
              actualDate.getMonth(),
            ])
          );
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

  return (
    <Layout>
      {user ? (
        <>
          <Routes>
            <Route path="/" exact element={<MainPage />} />
            <Route path="/add" element={<AddTransaction />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/user" element={<UserManager />} />
          </Routes>
        </>
      ) : (
        <Sign type={"in"} />
      )}
    </Layout>
  );
}

export default App;
