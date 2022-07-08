import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionsItem from "../Transaction/TransactionsItem"

import groceriesImg from '../../assets/grocery.png';
import foodDrinkImg from "../../assets/fork.png";
import fuelImg from "../../assets/gasoline.png";
import pharmacyImg from "../../assets/medicamento.png";
import othersImg from "../../assets/bolsa-de-la-compra.png";
import fixedImg from "../../assets/exclamacion.svg";

import './ExpensesList.css'
import LoadingSpinner from "../UI/LoadingSpinner";

const actualDate = new Date();

const ExpensesList = ({section, Toggle}) => {
  const [loading, setLoading] = useState(true);
  const fixedExp = useSelector((state) => state.expense.fixedExp);
  const expenses = useSelector((state) => state.expense.expenses);

  let iteration = [];
  let fixedModal = false;
  let fixedClass;

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  for (const expense of expenses) {
    if (section === "main") {
      fixedModal = true;
      fixedClass = fixedExp.length === 0 && "empty";
      if (
        expense.day === actualDate.getDate() &&
        expense.month === actualDate.getMonth() &&
        expense.year === actualDate.getFullYear()
      ) {
        iteration.push(expense);
      }
    } else {
      iteration = expenses;
    }
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
          type={'expense'}
          Toggle={Toggle}
          id={element.id}
          payed={element.payed}
        />
      );
    }

    return (
        <div className="expensesContainer">
          <p
            className="expensesContainerTitle"
            style={
              list.length < 1 && section !== "main" ? { textAlign: "center" } : {}
            }
          >
            Transactions
          </p>
          {fixedModal && (
            <figure className="transactionsFixedContainer">
              <img
                src={fixedImg}
                alt="fixed-expenses"
                className={"transactionsFixedImg " + fixedClass}
                onClick={() => {
                  if (fixedExp.length > 0) {
                    Toggle("Fixed");
                  }
                }}
              />
            </figure>
          )}
          <ul
            className={
              section !== "main"
                ? "transactionsList fullList"
                : "transactionsList"
            }
          >
            {list.length > 0 ? list : <li>No expenses</li>}
          </ul>
        </div>
      );
};

export default ExpensesList;
