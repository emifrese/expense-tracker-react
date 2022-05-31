import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const actualDate = new Date();

const Test = () => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const filteredIncomes = incomes.filter((inc) => {
    return (
      inc.year === actualDate.getFullYear() &&
      inc.month === actualDate.getMonth()
    );
  });
  const data = {
    labels: ["Emiliano", "Wanda"],
    datasets: [
      {
        label: "Incomes",
        data: [0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  for (const income of filteredIncomes) {
    const personId = income.personId;
    data.datasets[0].data[personId] += parseFloat(income.amount);
  }

  return <Doughnut data={data} />;
};

export default Test;
