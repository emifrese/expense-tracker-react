import React from "react";

import arrowUp from "../../assets/angulo-circulo-hacia-arriba.svg";
import arrowDown from "../../assets/angulo-circulo-abajo.svg";

import classes from './BalanceCard.module.css'

const BalanceCard = ({ remaining, incomes, expenses }) => {
  
  const content = (
    <div className={classes.balanceCard}>
      <div className={classes.balanceCardTitle}>
        <h2>Total Balance</h2>
        <p>$ {remaining}</p>
      </div>
      <div className={classes.balanceCardInfo}>
        <figure className={classes.balanceCardInfoInc}>
          <img className={classes.balanceCardInfoUp} src={arrowUp} alt="arrow-up" />
          <figcaption>Income {incomes}</figcaption>
        </figure>
        <figure className={classes.balanceCardInfoExp}>
          <img className={classes.balanceCardInfoDown} src={arrowDown} alt="arrow-down" />
          <figcaption>Expenses {expenses}</figcaption>
        </figure>
      </div>
    </div>
  );

  return content;
};

export default BalanceCard;
