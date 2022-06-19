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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses";

import { categories } from "../../helpers/variables";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartExpenses = ({type}) => {
  const filterExp = useSelector((state) => state.expense.filterExp);
  const totalPerCat = useSelector(state => state.expense.expensesTotalPerCategoryDate)
  const dispatch = useDispatch();
  console.log(type)

  useEffect(() => {
    dispatch(expenseActions.filterAmount([filterExp, categories]));
  }, [filterExp, dispatch]);

  const labels = totalPerCat.map((element) => element.category);

  const dataValues = totalPerCat.map((element) => element.amount);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Expenses',
      },
    },
    barThickness: 10,
  };

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
      {totalPerCat.length > 0 && <Bar options={options} data={data} />}
    </div>
  );
};

export default ChartExpenses;
