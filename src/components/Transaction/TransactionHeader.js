import React from "react";
import { Link } from "react-router-dom";
import TransactionToggle from "../UI/TransactionToggle";

import classes from './TransactionHeader.module.css'

const TransactionHeader = ({ typeChangeHandler, transactionType }) => {
  return (
    <>
      <div className={classes.backLinkContainer}>
        <Link to="/">X</Link>
      </div>

      <TransactionToggle
        onChangeType={typeChangeHandler}
        transactionType={transactionType}
      />
    </>
  );
};

export default TransactionHeader;
