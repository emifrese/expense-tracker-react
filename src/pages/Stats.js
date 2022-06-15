import React, { useState } from "react";
import "./Stats.css";

import meat from "../assets/meat.png";
import vegetable from "../assets/vegetable.png";
import backButton from "../assets/angulo-izquierdo.svg";
import filterButton from "../assets/filtrar.svg";
import TransactionToggle from "../components/UI/TransactionToggle";
import ChartExpenses from "../components/Charts/ChartExpenses";
import { useSelector } from "react-redux";
import Modal from "../components/UI/Modal";
import Filter from "../components/Filter/Filter";
import Header from "../components/UI/Header";
import TransactionsList from "../components/Transaction/TransactionsList";

const Stats = () => {
  const [type, settype] = useState(true);
  const [filterCart, setFilterCart] = useState(false);
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const totalIncomes = useSelector((state) => state.incomes.incomesTotalPerMate);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const dayDate = useSelector((state) => state.date.day);
  console.log(type);
  let carniceriaExp = { name: "Carniceria", amount: 0 };
  let verduleriaExp = { name: "Verduleria", amount: 0 };
  const homematesData = [];
  console.log(totalIncomes)
  // console.log(homemates);
  // for (const income of incomes) {
  //   console.log(income.person)
  //   if (homemates.some(el => el.person === income.person)) {
  //     if(!homematesData.some(el => el.name === income.person)){
  //       homematesData.push({ name: income.person, amount: income.amount})
  //     } else (
  //       console.log(homematesData.find(mate => mate.name === income.person))
  //       )
  //     }
  // }
  // console.log(homematesData)

  for (const expense of expenses) {
    if (
      expense.year === yearDate &&
      expense.month === monthDate &&
      expense.category === "Carniceria"
    ) {
      carniceriaExp.amount += expense.amount;
    }
  }

  for (const expense of expenses) {
    if (
      expense.year === yearDate &&
      expense.month === monthDate &&
      expense.category === "Verduleria"
    ) {
      verduleriaExp.amount += expense.amount;
    }
  }

  const typeChangeHandler = (e) => {
    settype(e);
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
              <ChartExpenses data={[carniceriaExp, verduleriaExp]} />
              <TransactionsList
                type={type ? "Incomes" : "Expenses"}
                expenses={expenses}
                incomes={incomes}
              />
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Stats;
