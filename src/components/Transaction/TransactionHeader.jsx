import React from "react";
import { Link } from "react-router-dom";
import TransactionToggle from "../UI/TransactionToggle";
import backImg from '../../assets/cruzar.svg'

import classes from './TransactionHeader.module.css'

const TransactionHeader = ({ typeChangeHandler, transactionType }) => {
  return (
    <>
      <div className={classes.backLinkContainer}>
        <Link to="/" className={classes.crossContainer}>
          <img src={backImg} alt="back-button" />
        </Link>
      </div>

      <TransactionToggle
        onChangeType={typeChangeHandler}
        transactionType={transactionType}
      />
    </>
  );
};

export default TransactionHeader;
