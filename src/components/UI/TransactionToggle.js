import React from "react";

import classes from './TransactionToggle.module.css'

const TransactionToggle = ({onChangeType, transactionType}) => {

  return (
    <div className={classes.transactionToggle}>
      <label className={classes.switch}>
        <input
          type="checkbox"
          defaultChecked={transactionType}
          onChange={() => onChangeType(state => !state)}
        />
        <span className={classes.slider}></span>
      </label>
    </div>
  );
};

export default TransactionToggle;
