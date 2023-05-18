import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { actualDate } from "../../helpers/variables";

import TransactionsItem from "../Transaction/TransactionsItem";
import LoadingSpinner from "../UI/LoadingSpinner";

import groceriesImg from "../../assets/grocery.png";
import foodDrinkImg from "../../assets/fork.png";
import fuelImg from "../../assets/gasoline.png";
import pharmacyImg from "../../assets/medicamento.png";
import othersImg from "../../assets/bolsa-de-la-compra.png";
import fixedImg from "../../assets/exclamacion.svg";

import classes from "./ExpensesList.module.css";

const ExpensesList = ({ section, Toggle }) => {
  const [loading, setLoading] = useState(true);
  const newExpArray = useSelector((state) => state.expense.expensePerMonth);
  const fixedExp = useSelector((state) => state.expense.newFixedExp);
  const filterExp = useSelector((state) => state.expense.orderedExpenses);



  let iteration = [];
  let fixedModal = false;
  let fixedClass;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (section === "main") {
    const month = actualDate.getMonth();
    const year = actualDate.getFullYear();
    const stringCompare = month.toString() + year.toString();
    const index = newExpArray
      .map((exp) => exp.monthYear)
      .indexOf(stringCompare);
    fixedModal = true;
    fixedClass = fixedExp.length === 0;

    if (index !== -1) {
      for(const expense of newExpArray[index].expenses){
        if(expense.day === actualDate.getDate()){
          iteration.push(expense)
        }
      }
    }
  } else {
    iteration = filterExp;
  }

  const list = [];
  if (typeof iteration === "undefined") {
    return <p>No expenses to show</p>;
  }

  for (const [i, element] of iteration.entries()) {
    let imgIcon;
    switch (element.category) {
      case "Groceries":
        imgIcon = groceriesImg;
        break;
      case "Food & Drink":
        imgIcon = foodDrinkImg;
        break;
      case "Fuel":
        imgIcon = fuelImg;
        break;
      case "Pharmacy":
        imgIcon = pharmacyImg;
        break;
      case "Others":
        imgIcon = othersImg;
        break;
      default:
    }
    console.log(element)
    list.push(
      <TransactionsItem
        imgIcon={imgIcon}
        colorIcon={element.colors.colorIcon}
        borderColor={element.colors.borderColor}
        title={element.title}
        amount={element.amount}
        day={element.day}
        month={element.month}
        key={i}
        type={"expense"}
        Toggle={Toggle}
        id={element.id}
        payed={element.payed}
        category={element.category}
      />
    );
  }

  return (
    <div className={classes.expensesContainer}>
      <p
        className={classes.expensesContainerTitle}
        style={
          list.length < 1 && section !== "main" ? { textAlign: "center" } : {}
        }
      >
        Transactions
      </p>
      {fixedModal && (
        <figure className={classes.transactionsFixedContainer}>
          <img
            src={fixedImg}
            alt="fixed-expenses"
            className={classes.transactionsFixedImg}
            style={fixedClass ? { opacity: 0.5 } : { opacity: 1 }}
            onClick={() => {
              if (fixedExp.length > 0) {
                Toggle("Fixed");
              }
            }}
          />
        </figure>
      )}
      <ul
        className={classes.transactionsList}
        style={
          section !== "main"
            ? { minHeight: "calc(100vh - 385px)" }
            : { minHeight: "calc(100vh - 350px)" }
        }
      >
        {list.length > 0 ? list : <li>No expenses</li>}
      </ul>
    </div>
  );
};

export default ExpensesList;
