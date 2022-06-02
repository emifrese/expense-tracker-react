import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
const CurrentMoney = () => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);

  let allIncomes = 0;
  let allExpenses = 0;


  
  for (const income of incomes) {
    if (income.year === yearDate && income.month === monthDate) {
      allIncomes += income.amount
    }
  }

  for (const expense of expenses) {
    if(expense.year === yearDate && expense.month === monthDate) {
      allExpenses += expense.amount;
    }
  }
  
  const remaining = allIncomes - allExpenses;
  
  const data = {
    labels: ["Gastos", "Disponible"],
    datasets: [
      {
        label: "Current Balance",
        data: [allExpenses, remaining],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };


  return <Doughnut data={data} />;
};

export default CurrentMoney;
