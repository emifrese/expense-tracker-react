import React from "react";

import { months } from "../../helpers/variables";
import deleteImg from "../../assets/basura.svg";

import classes from './TransactionsItem.module.css'

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
  category,
  Toggle,
  payed
}) => {
  let listItem;
  if (type === "expense") {
    const status = payed ? classes.payed : classes.pending;
    const titleStatus = !payed ? '(not payed)' : '';
    listItem = (
      <>
        <li className={classes.transactionItem}>
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
            <figure className={classes.deleteContainer}>
              <img
                src={deleteImg}
                alt="delte-expense"
                className={classes.deleteButton}
                onClick={() => Toggle('Delete', id, type)}
              />
            </figure>
          <div>
            <p>-${amount}</p>
            <p className={classes.transactionsListDay}>
              {day + " " + months[month].slice(0, 3)}
            </p>
          </div>
        </li>
      </>
    );
  } else {
    console.log(job)
    listItem = (
      <>
        <li className={classes.transactionItem}>
          <figure>
            <img
              src={imgIcon}
              alt="category-icon"
              style={{ borderColor: borderColor, backgroundColor: colorIcon }}
            />
            <figcaption>{title}</figcaption>
          </figure>
          <figure className={classes.deleteContainer}>
              <img
                src={deleteImg}
                alt="delte-expense"
                className={classes.deleteButton}
                onClick={() => Toggle('Delete', id, type)}
              />
            </figure>
          <div>
            <p>+${amount}</p>
            <p className={classes.transactionsListDay}>{job || category}</p>
          </div>
        </li>
      </>
    );
  }

  return listItem;
};

export default TransactionsItem;
