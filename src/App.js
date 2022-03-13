//import ExpenseItem from "./components/ExpenseItem";
// import React from 'react'; Old form of using JSX

// fix the first of the month
import { auth, firestore } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { useState, useEffect, Fragment } from "react";
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

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     title: "Toilet Paper",
//     amount: 94.12,
//     date: new Date(2020, 7, 14),
//   },
//   { id: "e2", title: "New TV", amount: 799.49, date: new Date(2021, 2, 12) },
//   {
//     id: "e3",
//     title: "Car Insurance",
//     amount: 294.67,
//     date: new Date(2021, 2, 28),
//   },
//   {
//     id: "e4",
//     title: "New Desk (Wooden)",
//     amount: 450,
//     date: new Date(2021, 5, 12),
//   },
// ];

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState(null);

  const signOut = () => auth.signOut();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/expense`),
        (snapshot) => {
          let expensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          console.log(expensesArray);
          setExpenses(expensesArray);
        }
      );
    }
  }, [user]);

  const addExpenseHandler = async (expense) => {
    // console.log('In App.js');
    // // console.log(expense);
    // setExpenses((prevExpenses) => {
    //   return [expense, ...prevExpenses];
    // });
    const expenseRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/expense`
    );
    await addDoc(expenseRef, expense);
  };

  const deleteExpenseHandler = (expenseId) => {
    deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/expense/${expenseId}`)
    );

    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== expenseId
      );
      return updatedExpenses;
    });
  };
  // return React.createElement('div', {}, React.createElement('h2', {}, 'Lets get Started!'), React.createElement(Expenses, {items: expenses})
  // ); Old form of using JSX

  return user && expenses !== null ? (
    <Fragment>
      <div>
        <NewExpense onAddExpense={addExpenseHandler} />

        <Expenses items={expenses} onDeleteExpense={deleteExpenseHandler} />
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
