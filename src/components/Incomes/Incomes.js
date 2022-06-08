import { useState } from "react";
import CurrentMoney from "../CurrentMoney/CurrentMoney";
import Card from "../UI/Card";
import "./Incomes.css";
import IncomesChart from "./IncomesChart";
import IncomesForm from "./IncomesForm";

const Incomes = (props) => {
  const buttonIncome = <button onClick={addNewIncome}>Add New Income</button>;

  const [state, setState] = useState(buttonIncome);

  const resetNewIncome = () => {
    setState(buttonIncome);
  };

  function addNewIncome() {
    setState(<IncomesForm cancelButton={resetNewIncome} />);
  }

  return (
    <>
      <div className="incomes">
        <IncomesChart />
        <IncomesForm
        cancelButton={resetNewIncome}
    />
        <CurrentMoney />
      </div>
      <Card className="new-income">{state}</Card>
    </>
  );
};

export default Incomes;
