import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import LoadingSpinner from "../UI/LoadingSpinner";

import jobImg from "../../assets/maletin.svg";
import giftImg from "../../assets/regalo.svg";
import debtImg from "../../assets/recibo.svg";
import TransactionsItem from "../Transaction/TransactionsItem";

import classes from './IncomesList.module.css'

const IncomesList = ({ Toggle }) => {
  const filterInc = useSelector((state) => state.incomes.filterInc);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer1)
    }

    
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const list = [];


  for (const [i, element] of filterInc.entries()) {
    let imgIcon;
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

    list.push(
      <TransactionsItem
        imgIcon={imgIcon}
        colorIcon={element.colors.colorIcon}
        borderColor={element.colors.borderColor}
        title={element.person}
        amount={element.amount}
        month={element.month}
        key={i}
        job={element.job}
        category={element.type}
        type={"income"}
        Toggle={Toggle}
        id={element.id}
      />
    );
  }

  return (
    <div className={classes.incomesContainer}>
      <p
        className={classes.incomesContainerTitle}
        style={list.length < 1 ? { textAlign: "center" } : {}}
      >
        Transactions
      </p>
      <ul className={classes.transactionsList}>
        {list.length > 0 ? list : <li>No Incomes</li>}
      </ul>
    </div>
  );
};

export default IncomesList;
