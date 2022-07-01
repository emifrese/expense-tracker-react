import React from "react";

import "./TransactionsList.css";

import groceriesImg from "../../assets/grocery.png";
import foodDrinkImg from "../../assets/fork.png";
import fuelImg from "../../assets/gasoline.png";
import pharmacyImg from "../../assets/medicamento.png";
import othersImg from "../../assets/bolsa-de-la-compra.png";
import jobImg from '../../assets/maletin.svg';
import giftImg from '../../assets/regalo.svg';
import debtImg from '../../assets/recibo.svg';

import TransactionsItem from "./TransactionsItem";

const actualDate = new Date();

const TransactionsList = ({ section, type, expenses, incomes, Toggle }) => {
  console.log(expenses)
  let iteration = [];
  if (type === "expense") {
    for (const expense of expenses) {
      if (section === "main") {
        if (
          expense.month === actualDate.getMonth() &&
          expense.year === actualDate.getFullYear() &&
          expense.day === actualDate.getDate()
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
  if(typeof iteration === 'undefined') {
    return <p>No {type} to show</p>
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
      switch(element.type){
        case 'Job':
          imgIcon = jobImg;
          break;
        case 'Gift/Present':
          imgIcon = giftImg;
          break;
        case 'Debt':
          imgIcon = debtImg;
          break;
        default:
       }
    }

    const border = i < iteration.length - 1 ? "bottomBorder" : "";

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
        border={border}
        type={type}
        job={element.job}
        Toggle={Toggle}
        id={element.id}
      />
    );
  }
  return (
    <div className="transactions">
      <p className="transactions__title">Transactions</p>
      <ul
        className={
          section !== "main"
            ? "transactions__list fullList"
            : "transactions__list"
        }
      >
        {list}
      </ul>
    </div>
  );
};

export default TransactionsList;
