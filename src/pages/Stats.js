import React, { useState } from 'react'
import './Stats.css'

import backButton from '../assets/caret-cuadrado-izquierda.svg'
import settingsButton from '../assets/ajustes-deslizadores.svg'
import TransactionToggle from '../components/UI/TransactionToggle'

const Stats = () => {
    const [addType, setAddType] = useState(true);

    const typeChangeHandler = (e) => {
        setAddType(e)
      }



  return (
    <div className='stats-container'>
        <header>
            <img src={backButton} alt='back-button'/>
            <h1>Statistics</h1>
            <img src={settingsButton} alt='options'/>
        </header>
        <main>
        <TransactionToggle onChangeType={typeChangeHandler} addType={addType}/>
        </main>
    </div>
  )
}

export default Stats