import React from "react";

import "./FixedCard.css";
import pinImg from "../../assets/chinche.svg";
import delImg from "../../assets/basura.svg";
import skipImg from "../../assets/angulo-doble-derecha.svg";
import { useState } from "react";
import SaveButton from "./SaveButton";

const FixedCard = ({ fixedExp }) => {
  const [expToSub, setExpToSub] = useState(fixedExp);
  const [expToDel, setExpToDel] = useState([]);
  console.log(expToSub);
  const fixedExpList = [];
  expToSub.forEach((fixExp, i) => {
    const actualDate = new Date();
    const toSkip = fixExp.skip.some(
      (date) =>
        date.month === actualDate.getMonth() &&
        date.year === actualDate.getFullYear()
    );
    const toDelete = expToDel.indexOf(fixExp.id);
    console.log(toSkip);
    fixedExpList.push(
      <div key={i} className="fixedExpItem">
        <figure className="fixedExpTitle">
          <img src={pinImg} alt="pin-expense" />
          <figcaption>{fixExp.title}</figcaption>
        </figure>
        <figure className="fixedExpDelInp">
          <img
            src={skipImg}
            alt="skip-expense"
            onClick={(e) => {
              if (toDelete === -1) {
                setExpToSub((state) => {
                  const actualDate = new Date();
                  let expEdit;
                  let newArray;
                  if (
                    !state[i].skip.some(
                      (date) =>
                        date.month === actualDate.getMonth() &&
                        date.year === actualDate.getFullYear()
                    )
                  ) {
                    expEdit = {
                      ...state[i],
                      skip: [
                        ...state[i].skip,
                        {
                          month: actualDate.getMonth(),
                          year: actualDate.getFullYear(),
                        },
                      ],
                    };
                    newArray = expToSub.map((exp) => {
                      if (exp.id !== e.target.id) {
                        return exp;
                      }
                    });
                  } else {
                    const indexDate = state[i].skip.findIndex(
                      (date) =>
                        date.month === actualDate.getMonth() &&
                        date.year === actualDate.getFullYear()
                    );
                    const skipObj = state[i].skip;
                    skipObj.splice(indexDate, 1);
                    newArray = expToSub.map((exp) => {
                      if (exp.id !== e.target.id) {
                        return exp;
                      }
                    });
                    expEdit = {
                      ...state[i],
                      skip: skipObj,
                    };
                  }
                  newArray[i] = expEdit;
                  return newArray;
                });
              }
            }}
          />
          <input
            type="number"
            placeholder={expToSub[i].amount}
            id={fixExp.id}
            onChange={(e) => {
              setExpToSub((state) => {
                let expEdit = { ...state[i], amount: +e.target.value };
                const newArray = expToSub.map((exp) => {
                  if (exp.id !== e.target.id) {
                    return exp;
                  }
                });
                newArray[i] = expEdit;
                return newArray;
              });
            }}
          />
          <img
            src={delImg}
            alt="delete-fixed"
            onClick={() => {
              if (!toSkip) {
                setExpToDel((state) => {
                  const indexExp = state.indexOf(fixExp.id);
                  if (indexExp > -1) {
                    const indexExp = state.indexOf(fixExp.id);
                    const newState = [...state];
                    newState.splice(indexExp, 1);
                    return newState;
                  } else {
                    return [...state, fixExp.id];
                  }
                });
              }
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
