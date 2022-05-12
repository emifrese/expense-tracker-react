import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

import Card from "../UI/Card";
import { useSelector } from "react-redux";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const actualDate = new Date();

const CurrentMoney = () => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);

  const filteredIncomes = incomes.filter((inc) => {
    return (
      inc.year === actualDate.getFullYear() &&
      inc.month === actualDate.getMonth()
    );
  });

  const filteredExpenses = expenses.filter((exp) => {
    return (
      exp.year === actualDate.getFullYear() &&
      exp.month === actualDate.getMonth()
    );
  });

  const options = {
    title: {
      text: "",
    },
    data: [
      {
        type: "doughnut",
        dataPoints: [{
            y: 0, indexLabel: 'Hola'
        }],
      },
    ],
  };



  return <CanvasJSChart options={options}/>;
};

export default CurrentMoney;
