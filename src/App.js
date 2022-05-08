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
import Incomes from "./components/Incomes/Incomes";

function App() {
  const [user, setUser] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [incomes, setIncomes] = useState(null);

  //Poner opcion para cargar categorias y despues guardarlas en firebase
  const categories = ["All", "Carniceria", "Verduleria"];

  const signOut = () => auth.signOut();

  useEffect(() => {
    onAuthStateChanged(auth, setUser);

    if (user !== null) {
      const objectsEqual = (o1, o2) => {
        Object.keys(o1).length === Object.keys(o2).length &&
          Object.keys(o1).every((p) => o1[p] === o2[p]);
      };

      const arraysEqual = (a1, a2) => {
        if (a1.length === 0) {
          if (a2 === null) {
            return true;
          }
        } else if (a2 === null) {
          return false;
        } else {
          console.log(a1, a2);
          return (
            a1.length === a2.length &&
            a1.every((o, idx) => objectsEqual(o, a2[idx]))
          );
        }
      };

      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/expense`),
        (snapshot) => {
          let expensesArray = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          if (expenses === null) {
            setExpenses(expensesArray);
            return;
          } else if(expensesArray.length > expenses.length) {
            console.log('render exp')
            setExpenses(expensesArray)
          }
        }
      );
      onSnapshot(
        collection(firestore, `users/${auth.currentUser.uid}/income`),
        (snapshot) => {
          if (snapshot.docs.length > 0) {
            let incomesArray = snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            console.log(incomesArray);
            console.log(incomes);
            if (incomes === null) {
              setIncomes(incomesArray);
              return;
            } else if (incomesArray.length > incomes.length) {
              console.log('render inc')
              setIncomes(incomesArray)
            }
          }
        }
      );
    }
  }, [user, expenses, incomes]);

  const addExpenseHandler = async (expense) => {
    const expenseRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/expense`
    );
    await addDoc(expenseRef, expense);
  };

  const addIncomeHandler = async (income) => {
    const incomeRef = collection(
      firestore,
      `users/${auth.currentUser.uid}/income`
    );
    await addDoc(incomeRef, income);
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

  // console.log(window.screen.width)

  return user ? (
    <Fragment>
      {incomes !== null ? <p>Hay incomes</p> : ""}
      <div>
        <Incomes incomes={incomes} onAddIncome={addIncomeHandler} />
      </div>
      <div>
        <NewExpense onAddExpense={addExpenseHandler} categories={categories} />

        {expenses !== null ? (
          <Expenses
            items={expenses}
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
