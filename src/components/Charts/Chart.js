import "./Chart.css";
import ChartBar from "./ChartBar";

const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);
  const totalMaximum = Math.max(...dataPointValues);

  switch (props.type) {
    case "expenses":
      return (
        <div className="chart">
          {props.dataPoints.map((dataPoint) => (
            <ChartBar
              key={dataPoint.label}
              value={dataPoint.value}
              maxValue={totalMaximum}
              label={dataPoint.label}
            />
          ))}
        </div>
      );
    case "incomes":
      return (
        <div className="chart">
          {props.dataPoints.map((dataPoint) => (
            <ChartBar
              key={dataPoint.label}
              value={dataPoint.value}
              maxValue={totalMaximum}
              label={dataPoint.label}
            />
          ))}
        </div>
      );
    default:
      return <div>None</div>;
  }
};

export default Chart;
