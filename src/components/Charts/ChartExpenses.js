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
      position: "top",
    },
    title: {
      display: true,
      text: "Expenses",
    },
  },
  barThickness: 10,
};



const ChartExpenses = (props) => {
    console.log(props.data)
    const labels = props.data.map((element) => element.name)
    console.log(labels)

    const dataValues = props.data.map(element => element.amount)
    
    const data = {
        labels,
        datasets: [
            {
                label: "Dataset 1",
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
