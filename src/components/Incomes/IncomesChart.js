import React from 'react'

import { useSelector } from 'react-redux'
import Chart from '../Charts/Chart'


const IncomesChart = (props) => {
    const incomes = useSelector((state) => state.incomes.incomes);

    
    const chartDataPoints = [
        {label: 'Emiliano', value: 0},
        {label: 'Wanda', value: 0}
    ]

    for(const income of incomes) {
        const personId = income.personId;
        console.log(personId)
        chartDataPoints[personId].value += income.amount;
    }

  return (
    <Chart dataPoints={chartDataPoints} type='incomes'/>
  )
}

export default IncomesChart