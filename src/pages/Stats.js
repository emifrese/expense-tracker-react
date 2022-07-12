import React, { useState } from "react";

import backButton from "../assets/angulo-izquierdo.svg";
import filterButton from "../assets/filtrar.svg";
import TransactionToggle from "../components/UI/TransactionToggle";
import Modal from "../components/UI/Modal";
import Filter from "../components/Filter/Filter";
import Header from "../components/UI/Header";
import DeleteCard from "../components/UI/DeleteCard";
import StatusCard from "../components/UI/StatusCard";

import classes from "./Stats.module.css";
import { Suspense } from "react";

const ChartExpenses = React.lazy(() =>
  import("../components/Charts/ChartExpenses")
);
const ChartIncomes = React.lazy(() =>
  import("../components/Charts/ChartIncomes")
);

const ExpensesList = React.lazy(() =>
  import("../components/Expense/ExpensesList")
);
const IncomesList = React.lazy(() =>
  import("../components/Incomes/IncomesList")
);

const Stats = () => {
  const [type, setType] = useState(true);
  const [filterCart, setFilterCart] = useState([false, ""]);

  const typeChangeHandler = (e) => {
    setType(e);
  };

  const toggleModalCartHandler = (element, id, type) => {
    let modalElement;

    switch (element) {
      case "Filter":
        modalElement = <Filter />;
        break;
      case "Delete":
        modalElement = (
          <DeleteCard id={id} type={type} Toggle={toggleModalCartHandler} />
        );
        break;
      case "Status":
        modalElement = (
          <StatusCard id={id} status={type} Toggle={toggleModalCartHandler} />
        );
        break;
      default:
    }

    setFilterCart((state) => [!state[0], modalElement]);
  };

  return (
    <>
      {filterCart[0] && (
        <Modal Toggle={toggleModalCartHandler}>{filterCart[1]}</Modal>
      )}
      <div className={classes.statsContainer}>
        <Header
          type="stats"
          leftImg={backButton}
          titleText="Statistics"
          rightImg={filterButton}
          Toggle={toggleModalCartHandler}
        />
        <main>
          <TransactionToggle onChangeType={typeChangeHandler} type={type} />
          <>
            <div className={classes.chartContainer}>
              <Suspense fallback={<>...</>}>
                {type ? <ChartIncomes /> : <ChartExpenses type={type} />}
              </Suspense>
            </div>
            <Suspense fallback={<>...</>}>
              {type ? (
                <IncomesList Toggle={toggleModalCartHandler} />
              ) : (
                <ExpensesList section="stats" Toggle={toggleModalCartHandler} />
              )}
            </Suspense>
          </>
        </main>
      </div>
    </>
  );
};

export default Stats;
