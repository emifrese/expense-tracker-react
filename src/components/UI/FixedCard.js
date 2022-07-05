import React from "react";

import "./FixedCard.css";
import pinImg from "../../assets/chinche.svg";
import delImg from "../../assets/basura.svg";
import { useState } from "react";
import SaveButton from "./SaveButton";

const FixedCard = ({ fixedExp }) => {
  const [expToSub, setExpToSub] = useState(fixedExp);
  console.log(expToSub);
  const fixedExpList = [];
  fixedExp.forEach((fixExp, i) => {
    console.log(expToSub[i]);
    fixedExpList.push(
      <div key={i} className="fixedExpItem">
        <figure className="fixedExpTitle">
          <img src={pinImg} alt="pin-expense" />
          <figcaption>{fixExp.title}</figcaption>
        </figure>
        <figure className="fixedExpDelInp">
          <img src={delImg} alt="delete-fixed" />
          <input
            type="number"
            placeholder={expToSub[i].amount}
            id={fixExp.id}
            onChange={(e) => {
              setExpToSub(state => {
                let expEdit = { ...state[i], amount: +e.target.value };
                const newArray = expToSub.map((exp) => {
                  if (exp.id !== e.target.id) {
                      return exp;
                    }
                  });  
                  newArray[i] = expEdit;
                  return newArray;
              })
              
            }}
          />
        </figure>
      </div>
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();

    expToSub.forEach((exp) => console.log(exp.amount));
  };

  return (
    <>
      <h2>Fixed Expenses</h2>
      <form onSubmit={submitHandler} className="fixedExpForm">
        <div className="fixedContainer">{fixedExpList}</div>
        <SaveButton />
      </form>
    </>
  );
};

export default FixedCard;
