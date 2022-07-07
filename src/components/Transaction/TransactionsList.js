import React, { useEffect, useState } from "react";

import "./TransactionsList.css";

import groceriesImg from "../../assets/grocery.png";
import foodDrinkImg from "../../assets/fork.png";
import fuelImg from "../../assets/gasoline.png";
import pharmacyImg from "../../assets/medicamento.png";
import othersImg from "../../assets/bolsa-de-la-compra.png";
import jobImg from "../../assets/maletin.svg";
import giftImg from "../../assets/regalo.svg";
import debtImg from "../../assets/recibo.svg";
import fixedImg from "../../assets/exclamacion.svg";

import TransactionsItem from "./TransactionsItem";
import LoadingSpinner from "../UI/LoadingSpinner";

const actualDate = new Date();

const TransactionsList = ({
  section,
  type,
  expenses,
  incomes,
  Toggle,
  fixedExp,
}) => {
  const [loading, setLoading] = useState(true);
  let iteration = [];
  let fixedModal = false;
  let fixedClass;

  useEffect(() => {
    if(loading){
      setTimeout(() => {
        setLoading(false)
      }, 1500)
    }
  }, [loading])

  if(loading) {
    return <LoadingSpinner />
  }

  if (type === "expense") {
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
  } else {
    iteration = incomes;
  }

  const list = [];
  if (typeof iteration === "undefined") {
    return <p>No {type} to show</p>;
  }
  for (const [i, element] of iteration.entries()) {
    let imgIcon;
    if (type === "expense") {
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
    } else {
      switch (element.type) {
        case "Job":
          imgIcon = jobImg;
          break;
        case "Gift/Present":
          imgIcon = giftImg;
          break;
        case "Debt":
          imgIcon = debtImg;
          break;
        default:
      }
    }

    
    list.push(
      <TransactionsItem
        imgIcon={imgIcon}
        colorIcon={element.colors.colorIcon}
        borderColor={element.colors.borderColor}
        title={type === "expense" ? element.title : element.person}
        amount={element.amount}
        day={element.day}
        month={element.month}
        key={i}
        type={type}
        job={element.job}
        Toggle={Toggle}
        id={element.id}
        payed={element.payed}
      />
    );
  }
  

  return (
    <div className="transactions">
      <p className="transactions__title" style={list.length < 1 && section !== 'main' ? {textAlign: 'center'} : {}}>Transactions</p>
      {fixedModal && (
        <figure className="transactions__fixedContainer">
          <img
            src={fixedImg}
            alt="fixed-expenses"
            className={"transactions__fixedImg " + fixedClass}
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
            ? "transactions__list fullList"
            : "transactions__list"
        }
      >
        {list.length > 0 ? list : <li>No {type}</li>}
      </ul>
    </div>
  );
};

export default TransactionsList;
