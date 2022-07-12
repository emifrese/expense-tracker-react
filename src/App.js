import React, { Suspense } from "react";
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
import Sign from "./components/UI/Sign";
import { actualDate } from "./helpers/variables";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const AddTransaction = React.lazy(() => import("./pages/AddTransaction"));
const Stats = React.lazy(() => import("./pages/Stats"));
const UserManager = React.lazy(() => import("./pages/UserManager"));


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
          dispatch(expenseActions.firstEnteredData(expensesArray))
          const month = actualDate.getMonth().toString();
          const year = actualDate.getFullYear().toString();
          dispatch(expenseActions.orderExpenses(month + year))

        }
      );

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/income`),
        (snapshot) => {
          let incomesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(incomesActions.addIncome(incomesArray));
          dispatch(
            incomesActions.filterIncomes([
              incomesArray,
              actualDate.getMonth(),
              actualDate.getFullYear(),
            ])
          );
        }
      );

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/fixed-exp`),
        (snapshot) => {
          let fixedExpensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          dispatch(expenseActions.newFixed([fixedExpensesArray, actualDate.getFullYear(),
            actualDate.getMonth(),]))
        }
      );

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/homemates`),
        (snapshot) => {
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
            <Route
              path="/"
              exact
              element={
                <Suspense fallback={<>...</>}>
                  <MainPage />
                </Suspense>
              }
            />
            <Route
              path="/add"
              element={
                <Suspense fallback={<>...</>}>
                  <AddTransaction />
                </Suspense>
              }
            />
            <Route
              path="/stats"
              element={
                <Suspense fallback={<>...</>}>
                  <Stats />
                </Suspense>
              }
            />
            <Route
              path="/user"
              element={
                <Suspense fallback={<>...</>}>
                  <UserManager />
                </Suspense>
              }
            />
          </Routes>
        </>
      ) : (
        <Sign type={"in"} />
      )}
    </Layout>
  );
}

export default App;
