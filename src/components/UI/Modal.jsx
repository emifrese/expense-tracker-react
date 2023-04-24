import React from "react";
import ReactDOM from "react-dom";

import classes from './Modal.module.css'

const Backdrop = (props) => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onClose}
    />
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modalContainer}>
      <div className={classes.modal}>
        <>{props.children}</>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.Toggle} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
