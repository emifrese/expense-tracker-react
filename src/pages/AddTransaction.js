import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IncomesForm from "../components/Incomes/IncomesForm";
import ExpenseForm from "../components/NewExpense/ExpenseForm";
import TransactionHeader from "../components/Transaction/TransactionHeader";

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState(true);

  const typeChangeHandler = (e) => {
    setTransactionType(e);
  };

  return (
    <>
      <TransactionHeader
        typeChangeHandler={typeChangeHandler}
        transactionType={transactionType}
      />
      {transactionType ? <ExpenseForm /> : <IncomesForm />}
    </>
  );
};

export default AddTransaction;
