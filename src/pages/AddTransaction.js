import React, { useState } from "react";
import TransactionHeader from "../components/Transaction/TransactionHeader";
import { Suspense } from "react";

const ExpenseForm = React.lazy(() =>
  import("../components/Expense/ExpenseForm")
);
const IncomesForm = React.lazy(() =>
  import("../components/Incomes/IncomesForm")
);

const AddTransaction = () => {
  console.log("render add transaction");
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
      <Suspense fallback={<>...</>}>
        {transactionType ? <ExpenseForm /> : <IncomesForm />}
      </Suspense>
    </>
  );
};

export default AddTransaction;
