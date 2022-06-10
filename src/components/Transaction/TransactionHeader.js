import React from "react";
import { Link } from "react-router-dom";
import TransactionToggle from "../UI/TransactionToggle";

import './TransactionHeader.css'

const TransactionHeader = ({ typeChangeHandler, transactionType }) => {
  return (
    <>
      <div className="back-link-container">
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
