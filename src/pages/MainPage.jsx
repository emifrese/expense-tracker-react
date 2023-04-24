import React, { useState } from "react";

import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

import cardImg from "../assets/id-insignia.svg";
import Modal from "../components/UI/Modal";
import PersonCard from "../components/Person/PersonCard";
import DeleteCard from "../components/UI/DeleteCard";
import StatusCard from "../components/UI/StatusCard";
import FixedCard from "../components/UI/FixedCard";
import ExpensesList from "../components/Expense/ExpensesList";

const MainPage = () => {
  const [modalCart, setModalCart] = useState([false, ""]);
  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL)
  
  const toggleModalCartHandler = (element, id, type, month, year) => {
    let modalElement;
    switch (element) {
      case "Person":
        modalElement = <PersonCard onClose={toggleModalCartHandler} />;
        break;
      case "Delete":
        modalElement = (
          <DeleteCard id={id} type={type} Toggle={toggleModalCartHandler} month={month} year={year} />
        );
        break;
      case "Status":
        modalElement = (
          <StatusCard id={id} status={type} Toggle={toggleModalCartHandler} />
        );
        break;
      case "Fixed":
        modalElement = (
          <FixedCard Toggle={toggleModalCartHandler} />
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
      <ExpensesList 
        section='main'
        Toggle={toggleModalCartHandler}
      />
      <NavBar />
    </>
  );
};

export default MainPage;
