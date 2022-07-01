import React, { useState } from "react";
import IncomesForm from "../components/Incomes/IncomesForm";
import ExpenseForm from "../components/Expense/ExpenseForm";
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
