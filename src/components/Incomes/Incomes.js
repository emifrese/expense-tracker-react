import { useState } from "react";
import Chart from "../Charts/Chart";
import Card from "../UI/Card";
import "./Incomes.css";
import IncomesChart from "./IncomesChart";
import IncomesForm from "./IncomesForm";

const Incomes = (props) => {
  const onSaveIncomeDataHandler = (enteredIncomeData) => {
    const incomeData = {
      ...enteredIncomeData,
    };
    props.onAddIncome(incomeData);
  };

  //     setState(<Chart dataPoints={incomesExample} type='incomes'/>);
  //   }

  return (
    <Card className="incomes">
      <IncomesChart />
      <IncomesForm
        onSaveIncomeData={onSaveIncomeDataHandler}
        // cancelButton={resetNewIncome}
      />

    </Card>
  );
};

export default Incomes;
