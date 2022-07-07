import React from "react";

import "./FixedCard.css";
import pinImg from "../../assets/chinche.svg";
import delImg from "../../assets/basura.svg";
import skipImg from "../../assets/angulo-doble-derecha.svg";
import { useState } from "react";
import SaveButton from "./SaveButton";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const FixedCard = ({ fixedExp, Toggle }) => {
  const [expToSub, setExpToSub] = useState(fixedExp);
  const [expToDel, setExpToDel] = useState([]);
  const fixedExpList = [];
  const actualDate = new Date();
  console.log(expToSub);
  expToSub.forEach((fixExp, i) => {
    const toSkip = fixExp.skip.some(
      (date) =>
        date.month === actualDate.getMonth() &&
        date.year === actualDate.getFullYear()
    );
    const toDelete = expToDel.indexOf(fixExp.id);

    fixedExpList.push(
      <div
        key={i}
        className="fixedExpItem"
        style={
          toSkip
            ? { backgroundColor: "#ccc" }
            : { backgroundColor: "transparent" }
        }
      >
        <figure className="fixedExpTitle">
          <img src={pinImg} alt="pin-expense" />
          <figcaption
            style={
              toDelete !== -1
                ? { textDecoration: "line-through" }
                : { textDecoration: "none" }
            }
          >
            {fixExp.title}
          </figcaption>
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
                      } else {
                        return null;
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
            style={toDelete !== -1 ? { opacity: 0.5 } : { opacity: 1 }}
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
            style={toSkip ? { opacity: 0.5 } : { opacity: 1 }}
          />
        </figure>
      </div>
    );
  });

  const submitHandler = (e) => {
    e.preventDefault();

    const skipExp = expToSub.filter((exp) =>
      exp.skip.some(
        (date) =>
          date.month === actualDate.getMonth() &&
          date.year === actualDate.getFullYear()
      )
    );

    const payedExp = expToSub.filter(
      (exp) =>
        !exp.skip.some(
          (date) =>
            date.month === actualDate.getMonth() &&
            date.year === actualDate.getFullYear()
        ) && expToDel.indexOf(exp.id) === -1
    );

    payedExp.forEach(async (exp) => {
      const expenseData = { ...exp, day: actualDate.getDate(), payed: true };
      const expenseRef = collection(
        firestore,
        `users/${auth.currentUser.uid}/expense`
      );
      await addDoc(expenseRef, expenseData);
    });

    skipExp.forEach(async (exp) => {
      await setDoc(
        doc(firestore, `users/${auth.currentUser.uid}/fixed-exp/${exp.id}`),
        exp
      );
    });

  expToDel.forEach(async (exp) => {
    await deleteDoc(
      doc(firestore, `users/${auth.currentUser.uid}/fixed-exp/${exp}`)
    )
  })    

    Toggle();
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
