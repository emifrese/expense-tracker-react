import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import "./ChartExpenses.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses";

import { categories } from "../../helpers/variables";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartExpenses = ({ type }) => {
  const filterExp = useSelector((state) => state.expense.filterExp);
  const totalPerCat = useSelector(
    (state) => state.expense.expensesTotalPerCategoryDate
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expenseActions.filterAmount([filterExp, categories]));
  }, [filterExp, dispatch]);

  const labels = totalPerCat.map((element) => element.category);

  const dataValues = totalPerCat.map((element) => element.amount);

  const backgroundColor = totalPerCat.map(
    (element) => element.colors.colorIcon
  );

  const borderColor = totalPerCat.map(element => element.colors.borderColor)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
      },
    },
    // barThickness: 10,
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor,
        borderColor,
        hoverBackgroundColor: borderColor,
      },
    ],
  };

  return (
    <div>{totalPerCat.length > 0 ? <Doughnut options={options} data={data} /> : <p>No expenses</p>}</div>
  );
};

export default ChartExpenses;
