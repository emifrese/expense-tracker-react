import React from 'react'

import './FixedCard.css'

const FixedCard = ({fixedExp}) => {
    const fixedExpList = []
    fixedExp.forEach(fixExp => {
        fixedExpList.push(
            <li>
                <p>{fixExp.title}</p>
                <p>{fixExp.year}</p>
            </li>
        )
    })
  return (
    <div><p>{fixedExpList}</p></div>
  )
}

export default FixedCard