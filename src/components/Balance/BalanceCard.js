import React from "react";

import './BalanceCard.css'
import arrowDown from "../../assets/arrow-down.png";
import arrowUp from "../../assets/arrow-up.png";

const BalanceCard = ({ remaining, incomes, expenses }) => {
  const content = (
    <div className="balance-card">
      <div className="balance-card__title">
        <h2>Total Balance</h2>
        <p>$ {remaining}</p>
      </div>
      <div className="balance-card__info">
        <figure className="balance-card__info_inc">
          <img src={arrowDown} alt="arrow-down" />
          <figcaption>Income {incomes}</figcaption>
        </figure>
        <figure className="balance-card__info_exp">
          <img src={arrowUp} alt="arrow-up" />
          <figcaption>Expenses {expenses}</figcaption>
        </figure>
      </div>
    </div>
  );

  return content;
};

export default BalanceCard;
