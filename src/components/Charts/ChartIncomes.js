import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartIncomes = (props) => {
  const incomesPerMate = useSelector(
    (state) => state.incomes.incomesTotalPerMate
  );

  const labels = incomesPerMate.map((element) => element.person);

  const dataValues = incomesPerMate.map((element) => element.amount);
  console.log(dataValues.length);

  const data = {
    labels,
    datasets: [
      {
        label: "Incomes",
        data: dataValues,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {dataValues.length > 0 ? (
        <div>
          <Doughnut data={data} />
        </div>
      ) : (
        <p>No incomes</p>
      )}
    </>
  );
};

export default ChartIncomes;
