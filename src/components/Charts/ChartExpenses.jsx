import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses";

import { categories } from "../../helpers/variables";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartExpenses = () => {
  const filterExp = useSelector((state) => state.expense.orderedExpenses);
  const totalPerCat = useSelector(
    (state) => state.expense.expensesAmountPerCat
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(expenseActions.separateAmounts(categories));
  }, [filterExp, dispatch]);

  const labels = totalPerCat.map((element) => element.category);

  const dataValues = totalPerCat.map((element) => element.amount);

  const backgroundColor = totalPerCat.map(
    (element) => element.colors.colorIcon
  );

  const borderColor = totalPerCat.map((element) => element.colors.borderColor);

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
    <>{totalPerCat.length > 0 && <Doughnut options={options} data={data} />}</>
  );
};

export default ChartExpenses;
