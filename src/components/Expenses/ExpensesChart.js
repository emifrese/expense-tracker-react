import Chart from "../Charts/Chart";
import { useSelector } from "react-redux";

const ExpensesChart = () => {
  const year = useSelector((state) => state.date.year);
  const expenses = useSelector(state => state.expense.expenses)


  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nox", value: 0 },
    { label: "Dec", value: 0 },
  ];

  for (const expense of expenses) {
      if(expense.year === year){
          const expenseMonth = expense.month;
          chartDataPoints[expenseMonth].value += expense.amount;
      }
  }


  return <Chart dataPoints={chartDataPoints} type="expenses" />;
};

export default ExpensesChart;
