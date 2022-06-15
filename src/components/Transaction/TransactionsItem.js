import React from "react";

import { months } from "../../helpers/variables";

const TransactionsItem = ({ imgIcon, colorIcon, title, amount, day, i, month, border }) => {
  const listItem = (
    <>
      <li className={border}>
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
          <p className="transactions__list_day">{day + ' ' + months[month].slice(0,3)}</p>
        </div>
      </li>
    </>
  );

  return listItem;
};

export default TransactionsItem;
