import React, { useState } from "react";

import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

import cardImg from "../assets/id-insignia.svg";
import Modal from "../components/UI/Modal";
import PersonCard from "../components/Person/PersonCard";
import TransactionsList from "../components/Transaction/TransactionsList";
import DeleteCard from "../components/UI/DeleteCard";
import StatusCard from "../components/UI/StatusCard";
import FixedCard from "../components/UI/FixedCard";

const MainPage = () => {
  const fixedExp = useSelector((state) => state.expense.fixedExp);
  const [modalCart, setModalCart] = useState([false, ""]);
  console.log(fixedExp);
  const expenses = useSelector((state) => state.expense.expenses);
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  const toggleModalCartHandler = (element, id, type) => {
    let modalElement;

    switch (element) {
      case "Person":
        modalElement = <PersonCard onClose={toggleModalCartHandler} />;
        break;
      case "Delete":
        modalElement = (
          <DeleteCard id={id} type={type} Toggle={toggleModalCartHandler} />
        );
        break;
      case "Status":
        modalElement = (
          <StatusCard id={id} status={type} Toggle={toggleModalCartHandler} />
        );
        break;
      case "Fixed":
        modalElement = (
          <FixedCard fixedExp={fixedExp} Toggle={toggleModalCartHandler} />
        );
        break;
      default:
    }

    setModalCart((state) => [!state[0], modalElement]);
  };

  return (
    <>
      {modalCart[0] && (
        <Modal Toggle={toggleModalCartHandler}>{modalCart[1]}</Modal>
      )}
      <Header
        type="main"
        titleText={displayName}
        leftImg={photoURL}
        rightImg={cardImg}
        Toggle={toggleModalCartHandler}
      />
      <Balance />
      <TransactionsList
        section="main"
        type="expense"
        expenses={expenses}
        fixedExp={fixedExp}
        Toggle={toggleModalCartHandler}
      />
      <NavBar />
    </>
  );
};

export default MainPage;
