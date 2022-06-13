import React, { useState } from "react";
import TransactionsList from "../components/Expenses/TransactionsList";
import Header from "../components/UI/Header";
import NavBar from "../components/UI/NavBar";
import { useSelector } from "react-redux";
import Balance from "../components/Balance/Balance";

import cardImg from "../assets/id-insignia.svg";
import Modal from "../components/UI/Modal";
import PersonCard from "../components/Person/PersonCard";

const MainPage = () => {
  const [fixedCart, setFixedCart] = useState(false);

  const displayName = useSelector((state) => state.user.displayName);
  const photoURL = useSelector((state) => state.user.photoURL);
  const email = useSelector((state) => state.user.email);
  const [homemates] = useSelector(state => state.user.homemates)

  const toggleFixedCartHandler = () => {
    setFixedCart((state) => !state);
  };

  return (
    <>
      {fixedCart && (
        <Modal Toggle={toggleFixedCartHandler}>
          <PersonCard
            onClose={toggleFixedCartHandler}
            name={displayName}
            photoURL={photoURL}
            email={email}
            homemates={homemates}
          />
        </Modal>
      )}
      <Header
        type="main"
        name={displayName}
        photoURL={photoURL}
        cardImg={cardImg}
        Toggle={toggleFixedCartHandler}
      />
      <Balance />
      <TransactionsList />
      <NavBar />
    </>
  );
};

export default MainPage;
