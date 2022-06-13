import React from "react";

import './BalanceCard.css'
import arrowUp from "../../assets/angulo-circulo-hacia-arriba.svg";
import arrowDown from "../../assets/angulo-circulo-abajo.svg";

const BalanceCard = ({ remaining, incomes, expenses }) => {
  
  const content = (
    <div className="balance-card">
      <div className="balance-card__title">
        <h2>Total Balance</h2>
        <p>$ {remaining}</p>
      </div>
      <div className="balance-card__info">
        <figure className="balance-card__info_inc">
          <img className="balance-card__info_up" src={arrowUp} alt="arrow-up" />
          <figcaption>Income {incomes}</figcaption>
        </figure>
        <figure className="balance-card__info_exp">
          <img className="balance-card__info_down" src={arrowDown} alt="arrow-down" />
          <figcaption>Expenses {expenses}</figcaption>
        </figure>
      </div>
    </div>
  );

  return content;
};

export default BalanceCard;
