import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const IncomesChart = (props) => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const monthDate = useSelector((state) => state.date.month);
  const yearDate = useSelector((state) => state.date.year);

  const filteredIncomes = incomes.filter((inc) => {
    return (
      inc.year === yearDate &&
      inc.month === monthDate
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

export default IncomesChart;
