import React, { useState } from "react";

import backButton from "../assets/angulo-izquierdo.svg";
import filterButton from "../assets/filtrar.svg";
import TransactionToggle from "../components/UI/TransactionToggle";
import ChartExpenses from "../components/Charts/ChartExpenses";
import Modal from "../components/UI/Modal";
import Filter from "../components/Filter/Filter";
import Header from "../components/UI/Header";
import ChartIncomes from "../components/Charts/ChartIncomes";
import DeleteCard from "../components/UI/DeleteCard";
import StatusCard from "../components/UI/StatusCard";
import ExpensesList from "../components/Expense/ExpensesList";
import IncomesList from "../components/Incomes/IncomesList";

import classes from './Stats.module.css'

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
              {type ? <ChartIncomes /> : <ChartExpenses type={type} />}
            </div>
            {type && <IncomesList Toggle={toggleModalCartHandler} />}
            {!type && (
              <ExpensesList section="stats" Toggle={toggleModalCartHandler} />
            )}
          </>
        </main>
      </div>
    </>
  );
};

export default Stats;
