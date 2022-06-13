import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import "./ChartExpenses.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Expenses",
    },
  },
  barThickness: 10,
};



const ChartExpenses = (props) => {
    const labels = props.data.map((element) => element.name)

    const dataValues = props.data.map(element => element.amount)
    
    const data = {
        labels,
        datasets: [
            {
                label: "",
          data: dataValues,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
    ],
    };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default ChartExpenses;
