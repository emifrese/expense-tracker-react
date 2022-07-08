import React, { useEffect, useState } from "react";
import "./Stats.css";

import backButton from "../assets/angulo-izquierdo.svg";
import filterButton from "../assets/filtrar.svg";
import TransactionToggle from "../components/UI/TransactionToggle";
import ChartExpenses from "../components/Charts/ChartExpenses";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/UI/Modal";
import Filter from "../components/Filter/Filter";
import Header from "../components/UI/Header";
import TransactionsList from "../components/Transaction/TransactionsList";
import { incomesActions } from "../store/incomes";
import { expenseActions } from "../store/expenses";
import ChartIncomes from "../components/Charts/ChartIncomes";
import DeleteCard from "../components/UI/DeleteCard";
import StatusCard from "../components/UI/StatusCard";

const Stats = () => {
  console.log('render stats page')
  const [type, setType] = useState(true);
  const [filterCart, setFilterCart] = useState([false, ""]);
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const filterExp = useSelector((state) => state.expense.filterExp);
  const filterInc = useSelector((state) => state.incomes.filterInc);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);

  useEffect(() => {
    dispatch(incomesActions.incomePerMateDate([incomes, monthDate, yearDate]));

    dispatch(incomesActions.filterIncomes([incomes, monthDate, yearDate]));

    dispatch(expenseActions.filterExpenses([expenses, monthDate, yearDate]));
  }, [incomes, monthDate, yearDate, expenses, dispatch]);

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
      <div className="stats-container">
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
            <div className="chartContainer">
              {type ? <ChartIncomes /> : <ChartExpenses type={type} />}
            </div>
            {(filterInc.length > 0 || filterExp.length > 0) && (
              <TransactionsList
                type={type ? "income" : "expense"}
                expenses={filterExp}
                incomes={filterInc}
                Toggle={toggleModalCartHandler}
              />
            )}
          </>
        </main>
      </div>
    </>
  );
};

export default Stats;
