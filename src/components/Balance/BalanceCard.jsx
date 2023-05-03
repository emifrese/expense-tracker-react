import React from "react";

import arrowUp from "../../assets/up.svg";
import arrowDown from "../../assets/down.svg";

import classes from './BalanceCard.module.css'

const BalanceCard = ({ remaining, incomes, expenses }) => {
  
  const content = (
    <div className={classes.balanceCard}>
      <div className={classes.balanceCardTitle}>
        <h2>Total Balance</h2>
        <p>$ {remaining}</p>
      </div>
      <div className={classes.balanceCardInfo}>
        <figure>
          <img src={arrowUp} alt="arrow-up" />
          <figcaption>Income {incomes}</figcaption>
        </figure>
        <figure>
          <img src={arrowDown} alt="arrow-down" />
          <figcaption>Expenses {expenses}</figcaption>
        </figure>
      </div>
    </div>
  );

  return content;
};

export default BalanceCard;
