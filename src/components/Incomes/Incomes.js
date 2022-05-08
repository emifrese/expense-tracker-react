import { useState } from "react";
import Chart from "../Charts/Chart";
import Card from "../UI/Card";
import "./Incomes.css";
import IncomesForm from "./IncomesForm";

const Incomes = (props) => {
  const onSaveIncomeDataHandler = (enteredIncomeData) => {
    const incomeData = {
      ...enteredIncomeData,
    };
    props.onAddIncome(incomeData);
  };

  let buttonIncome = <button>Add Incomes</button>;

  // Hay un error con re renders en este component
  
//   const [state, setState] = useState(buttonIncome);

//   const resetNewIncome = () => {
//     setState(buttonIncome);
//   };

//   if (props.incomes !== null) {
//     const incomesExample = [
//         {label: 'Work', value: 1500, person: 'Emi'},
//         {label: 'Work', value: 2000, person: 'Wan'},
//         {label: 'Saving', value: 500, person: null},
//         {label: 'Gift', value: 250, person: 'Hugo'},
//     ]; 

//     setState(<Chart dataPoints={incomesExample} type='incomes'/>);
//   }

//   function addNewIncome() {
//     setState(
//       <IncomesForm
//         onSaveIncomeData={onSaveIncomeDataHandler}
//         cancelButton={resetNewIncome}
//       />
//     );
//   }

  return <Card className="incomes">{buttonIncome}</Card>;
};

export default Incomes;
