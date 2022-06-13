import React, { useState } from "react";
import "./Stats.css";

import meat from "../assets/meat.png";
import vegetable from "../assets/vegetable.png";
import backButton from "../assets/angulo-izquierdo.svg";
import filterButton from "../assets/filtrar.svg";
import TransactionToggle from "../components/UI/TransactionToggle";
import ChartExpenses from "../components/Charts/ChartExpenses";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../components/UI/Modal";
import Filter from "../components/Filter/Filter";

const Stats = () => {
  const [type, settype] = useState(true);
  const [fixedCart, setFixedCart] = useState(false);
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const dayDate = useSelector((state) => state.date.day);

  let carniceriaExp = { name: "Carniceria", amount: 0 };
  let verduleriaExp = { name: "Verduleria", amount: 0 };

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

  const listElements = [];
  for (const expense of expenses) {
    if (
      expense.year === yearDate &&
      expense.month === monthDate
      // expense.day === dayDate
    ) {
      listElements.push(expense);
    }
  }


  const displayList = [];

  for (const [i, exp] of listElements.entries()) {
    const imgIcon = exp.category === "Carniceria" ? meat : vegetable;
    const colorIcon = exp.category === "Carniceria" ? "#FA8072" : "#28B463";

    const item = (
      <li key={i}>
        <figure>
          <img
            src={imgIcon}
            alt="category-icon"
            style={{ backgroundColor: colorIcon }}
          />
          <figcaption>{exp.title}</figcaption>
        </figure>
        <div>
          <p className="transactions__list_price">-${exp.amount}</p>
          <p className="transactions__list_day">{exp.day}</p>
        </div>
      </li>
    );

    displayList.push(item);
  }

  const typeChangeHandler = (e) => {
    settype(e);
  };

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  return (
    <>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <Filter />
        </Modal>
      )}
      <div className="stats-container">
        <header>
          <Link to="/">
            <img src={backButton} alt="back-button" />
          </Link>
          <h1>Statistics</h1>
          <img
            src={filterButton}
            alt="options"
            onClick={() => toggleFixedCartHandler()}
          />
        </header>
        <main>
          <TransactionToggle
            onChangeType={typeChangeHandler}
            type={type}
          />
          <ChartExpenses data={[carniceriaExp, verduleriaExp]} />
          <ul className="transactions__list">{displayList}</ul>
        </main>
      </div>
    </>
  );
};

export default Stats;
