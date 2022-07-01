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
  border,
  type,
  job,
  Toggle
}) => {
  let listItem;
  if (type === "expense") {
    listItem = (
      <>
        <li className={border}>
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
            <p className="transactions__list_price">-${amount}</p>
            <p className="transactions__list_day">
              {day + " " + months[month].slice(0, 3)}
            </p>
          </div>
        </li>
      </>
    );
  } else {
    listItem = (
      <>
        <li className={border}>
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
