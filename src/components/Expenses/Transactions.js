import React from "react";

import "./Transactions.css";

import meat from "../../assets/meat.png";
import vegetable from "../../assets/vegetable.png";
import { useSelector } from "react-redux";

const Transactions = () => {
  const expenses = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);
  const category = useSelector((state) => state.expense.category);

  let iteration = [];

  for (const expense of expenses) {
    if (expense.month === monthDate && expense.year === yearDate) {
      if (category === "All") {
        iteration.push(expense);
      } else if (expense.category === category) {
        iteration.push(expense);
      }
    }
  }
  iteration.sort((a, b) => {
    return a.day - b.day;
  });

  const list = [];

  for (const element of iteration) {
    const imgIcon = element.category === 'Carniceria' ? meat : vegetable;
    const colorIcon = element.category === 'Carniceria' ? "#FA8072" : "#28B463";

    const listItem = (
      <li>
        <figure>
          <img
            src={imgIcon}
            alt="category-icon"
            style={{ backgroundColor: colorIcon }}
          />
          <figcaption>{element.title}</figcaption>
        </figure>
        <div>
          <p className="transactions__list_price">-${element.amount}</p>
          <p className="transactions__list_day">{element.day}</p>
        </div>
      </li>
    );

    list.push(listItem)
  }

  return (
    <div className="transactions">
      <p className="transactions__title">Transactions</p>
      <p className="transactions__all">View All</p>
      <ul className="transactions__list">
        {/* <li>
          <figure>
            <img
              src={meat}
              alt="category-icon"
              style={{ backgroundColor: "#FA8072" }}
            />
            <figcaption>Food</figcaption>
          </figure>
          <div>
            <p className="transactions__list_price">-$50.00</p>
            <p className="transactions__list_day">Today</p>
          </div>
        </li>
        <li>
          <figure>
            <img
              src={vegetable}
              alt="category-icon"
              style={{ backgroundColor: "#28B463" }}
            />
            <figcaption>Carrot</figcaption>
          </figure>
          <div>
            <p className="transactions__list_price">-$20.00</p>
            <p className="transactions__list_day">Yesterday</p>
          </div>
        </li> */}
        {list}
      </ul>
    </div>
  );
};

export default Transactions;
