import React, { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { useDispatch, useSelector } from "react-redux";
import { incomesActions } from "../../store/incomes";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartIncomes = () => {
  const filterInc = useSelector(state => state.incomes.newFilterInc)
  const incomesPerMate = useSelector(
    (state) => state.incomes.incomesPerMate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(incomesActions.incomesPerMate(filterInc))
  }, [filterInc, dispatch])

  const labels = incomesPerMate.map((element) => element.person);

  const dataValues = incomesPerMate.map((element) => element.amount);

  const backgroundColor = incomesPerMate.map(
    (element) => element.colors.colorIcon
  );

  const borderColor = incomesPerMate.map(
    (element) => element.colors.borderColor
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Incomes",
        data: dataValues,
        backgroundColor,
        borderColor,
        hoverBackgroundColor: borderColor,
        borderWidth: 1,
      },
    ],
  };


  return (
      <>
        {dataValues.length > 0 && (
          <Doughnut data={data} />
        )}
      </>
  );
};

export default ChartIncomes;
