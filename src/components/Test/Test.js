import React from 'react'
import CanvasJSReact from '../../assets/canvasjs.react'

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const options = {
    title: {
      text: "Basic Column Chart in React"
    },
    backgroundColor: 'transparent',
    data: [{				
              type: "doughnut",
              dataPoints: [
                  { y: 50, indexLabel: "Apple"  },
                  { y: 50, indexLabel: "Orange"  }
              ]
     }]
 }

const Test = () => {
  return (
    <div>
        <CanvasJSChart options={options}/>
    </div>
  )
}

export default Test