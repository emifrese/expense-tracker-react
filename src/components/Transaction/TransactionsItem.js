import React from "react";

import { months } from "../../helpers/variables";
import deleteImg from "../../assets/basura.svg";

const TransactionsItem = ({
  imgIcon,
  colorIcon,
  borderColor,
  title,
  amount,
  day,
  id,
  month,
  type,
  job,
  Toggle,
  payed
}) => {
  let listItem;
  if (type === "expense") {
    const status = payed ? 'payed' : 'pending';
    const titleStatus = !payed ? '(not payed)' : '';
    listItem = (
      <>
        <li className='transactionItem'>
          <figure>
            <img
              src={imgIcon}
              alt="category-icon"
              style={{ borderColor: borderColor, backgroundColor: colorIcon }}
              className={status}
              onClick={() => Toggle('Status', id, payed)}
            />
            <figcaption>{title}{' '}<em>{titleStatus}</em></figcaption>
          </figure>
            <figure className="deleteContainer">
              <img
                src={deleteImg}
                alt="delte-expense"
                className="deleteButton"
                onClick={() => Toggle('Delete', id, type)}
              />
            </figure>
          <div>
            <p className="transactionsListPrice">-${amount}</p>
            <p className="transactionsListDay">
              {day + " " + months[month].slice(0, 3)}
            </p>
          </div>
        </li>
      </>
    );
  } else {
    listItem = (
      <>
        <li className='transactionItem'>
          <figure>
            <img
              src={imgIcon}
              alt="category-icon"
              style={{ borderColor: borderColor, backgroundColor: colorIcon }}
            />
            <figcaption>{title}</figcaption>
          </figure>
          <figure className="deleteContainer">
              <img
                src={deleteImg}
                alt="delte-expense"
                className="deleteButton"
                onClick={() => Toggle('Delete', id, type)}
              />
            </figure>
          <div>
            <p className="transactions__list_price">+${amount}</p>
            <p className="transactions__list_day">{job}</p>
          </div>
        </li>
      </>
    );
  }

  return listItem;
};

export default TransactionsItem;
