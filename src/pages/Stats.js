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
import { categories } from "../helpers/variables";
import ChartIncomes from "../components/Charts/ChartIncomes";

const Stats = () => {
  const [type, setType] = useState(true);
  const [filterCart, setFilterCart] = useState(false);
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalIncomes = useSelector(
    (state) => state.incomes.incomesTotalPerMate
  );
  const filterExp = useSelector((state) => state.expense.filterExp);
  const filterInc = useSelector((state) => state.incomes.filterInc);
  const totalPerCat = useSelector(
    (state) => state.expense.expensesTotalPerCategoryDate
  );
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const dayDate = useSelector((state) => state.date.day);

  console.log(totalPerCat);
  let carniceriaExp = { name: "Carniceria", amount: 0 };
  let verduleriaExp = { name: "Verduleria", amount: 0 };

  useEffect(() => {
    dispatch(incomesActions.incomePerMateDate([incomes, monthDate, yearDate]));

    dispatch(incomesActions.filterIncomes([incomes, monthDate, yearDate]));

    dispatch(expenseActions.filterExpenses([expenses, monthDate, yearDate]));
  }, [incomes, monthDate, yearDate, expenses, dispatch]);

  const typeChangeHandler = (e) => {
    setType(e);
  };

  const toggleFilterCartHandler = () => {
    setFilterCart((state) => !state);
  };

  return (
    <>
      {filterCart && (
        <Modal Toggle={toggleFilterCartHandler}>
          <Filter />
        </Modal>
      )}
      <div className="stats-container">
        <Header
          type="stats"
          leftImg={backButton}
          titleText="Statistics"
          rightImg={filterButton}
          Toggle={toggleFilterCartHandler}
        />
        <main>
          <TransactionToggle onChangeType={typeChangeHandler} type={type} />
          {expenses.length < 1 ? (
            <p>No expenses</p>
          ) : (
            <>
              {type ? <ChartIncomes /> : <ChartExpenses type={type} />}
              <TransactionsList
                type={type ? "Incomes" : "Expenses"}
                expenses={filterExp}
                incomes={filterInc}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Stats;
