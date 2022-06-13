import React from "react";

const TransactionsItem = ({imgIcon, colorIcon, title, amount, day, i}) => {
  const listItem = (
    <li>
      <figure>
        <img
          src={imgIcon}
          alt="category-icon"
          style={{ backgroundColor: colorIcon }}
        />
        <figcaption>{title}</figcaption>
      </figure>
      <div>
        <p className="transactions__list_price">-${amount}</p>
        <p className="transactions__list_day">{day}</p>
      </div>
    </li>
  );

  return listItem;
};

export default TransactionsItem;
