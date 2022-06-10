import React from "react";

import './TransactionToggle.css'

const TransactionToggle = ({onChangeType, transactionType}) => {

  return (
    <div className="transaction-toggle">
      <label className="switch">
        <input
          type="checkbox"
          defaultChecked={transactionType}
          onChange={(e) => onChangeType(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default TransactionToggle;
