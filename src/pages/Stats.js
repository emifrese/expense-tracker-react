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
import DeleteCard from "../components/UI/DeleteCard";

const Stats = () => {
  const [type, setType] = useState(true);
  const [filterCart, setFilterCart] = useState([false, '']);
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

  const toggleFilterCartHandler = (element, id, type) => {
    let modalElement;
    console.log(element)

    switch(element){
      case 'Filter':
        modalElement = <Filter />;
        break;
      case 'Delete':
        modalElement = <DeleteCard id={id} type={type} Toggle={toggleFilterCartHandler}/>;
        break;
      default:
    }

    setFilterCart((state) => [!state[0], modalElement]);
  };
  console.log(filterCart)
  return (
    <>
      {filterCart[0] && (
        <Modal Toggle={toggleFilterCartHandler}>
          {filterCart[1]}
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
                type={type ? "income" : "expense"}
                expenses={filterExp}
                incomes={filterInc}
                Toggle={toggleFilterCartHandler}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Stats;
