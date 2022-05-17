import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";

import Card from "../UI/Card";
import { useSelector } from "react-redux";

import "./CurrentMoney.css";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

CanvasJS.addColorSet("currentMoney", ["#2a9d8f", "#e63946"]);

const actualDate = new Date();

const CurrentMoney = () => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const expenses = useSelector((state) => state.expense.expenses);

  let allIncomes = 0;
  let allExpenses = 0;

  for (const inc of incomes) {
    if (
      inc.year === actualDate.getFullYear() &&
      inc.month === actualDate.getMonth()
    ) {
      allIncomes += inc.amount;
    }
  }

  for (const exp of expenses) {
    if (
      exp.year === actualDate.getFullYear() &&
      exp.month === actualDate.getMonth()
    ) {
      allExpenses += exp.amount;
    }
  }

  const remaining = allIncomes - allExpenses;

  const options = {
    animationEnabled: true,
    colorSet: "currentMoney",
    title: {
      text: "",
    },
    data: [
      {
        type: "doughnut",
        dataPoints: [
          {
            y:remaining,
            indexLabel: "Disponible",
          },
          {
            y: allExpenses,
            indexLabel: 'Gastos',
          },
        ],
      },
    ],
  };

  return (
    <Card className="current-money">
      <CanvasJSChart options={options} />
    </Card>
  );
};

export default CurrentMoney;
