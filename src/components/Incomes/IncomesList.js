import React, { useEffect, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

import jobImg from "../../assets/maletin.svg";
import giftImg from "../../assets/regalo.svg";
import debtImg from "../../assets/recibo.svg";

import "./IncomesList.css";
import { useSelector } from "react-redux";
import TransactionsItem from "../Transaction/TransactionsItem";

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

  if (typeof filterInc === "undefined") {
    return <p>No incomes to show</p>;
  }

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
        type={"income"}
        Toggle={Toggle}
        id={element.id}
      />
    );
  }

  return (
    <div className="incomesContainer">
      <p
        className="incomesContainerTitle"
        style={list.length < 1 ? { textAlign: "center" } : {}}
      >
        Transactions
      </p>
      <ul className="transactionsList">
        {list.length > 0 ? list : <li>No Incomes</li>}
      </ul>
    </div>
  );
};

export default IncomesList;
