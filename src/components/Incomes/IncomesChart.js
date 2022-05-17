import React from "react";
import CanvasJSReact from "../../assets/canvasjs.react";
import './IncomesChart.css'
import { useSelector } from "react-redux";
import Card from "../UI/Card";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const actualDate = new Date();

const IncomesChart = (props) => {
  const incomes = useSelector((state) => state.incomes.incomes);
  const filteredIncomes = incomes.filter((inc) => {
    return (
      inc.year === actualDate.getFullYear() &&
      inc.month === actualDate.getMonth()
    );
  });

  const chartDataPoints = [
    { label: "Emiliano", value: 0 },
    { label: "Wanda", value: 0 },
  ];

  for (const income of filteredIncomes) {
    const personId = income.personId;
    chartDataPoints[personId].value += parseFloat(income.amount);
  }

  const filteredChartDataPoints = chartDataPoints.filter((inc) => {
    return inc.value !== 0;
  });

  let finalChartDataPoints = [];

  for (let i = 0; i < filteredChartDataPoints.length; i++) {
    let charObj = {
      y: 0,
      indexLabel: "",
    };
    charObj.y = filteredChartDataPoints[i].value;
    charObj.indexLabel = filteredChartDataPoints[i].label;
    finalChartDataPoints.push(charObj);
  }

  const options = {
    animationEnabled: true,
    title: {
      text: "",
    },
    data: [
      {
        type: "doughnut",
        dataPoints: finalChartDataPoints,
      },
    ],
  };

  return (
    <>
      {finalChartDataPoints.length < 1 ? (
        <p>No hay incomes</p>
      ) : (
        <Card className="incomes-chart">
          <CanvasJSChart options={options} />
        </Card>
      )}
    </>
  );
};

export default IncomesChart;
