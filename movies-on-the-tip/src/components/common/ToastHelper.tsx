import { faCheckSquare, faTimesSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type Props = {
  heading: string;
  message: string;
  variant: string;
  onCloseHandler: Function;
};

const ToastHelper = ({ heading, message, variant, onCloseHandler }: Props) => {
  const [show, setShow] = useState(true);
  const iconBackgroundColor = heading === 'Error' ? 'red' : 'green';
  return (
    <ToastContainer
      position="top-end"
      style={{ zIndex: "1", margin: "1vmax" }}
      containerPosition="fixed"
    >
      <Toast
        onClose={() => {
          setShow(false);
          onCloseHandler();
        }}
        show={show}
        delay={3000}
        autohide
        bg={variant.toLowerCase()}
      >
        <Toast.Header>
          <FontAwesomeIcon
            icon={heading === "Error" ? faTimesSquare : faCheckSquare}
            className="ms-2"
            style={{ color: iconBackgroundColor, padding: '8px' }}
          ></FontAwesomeIcon>
          <strong className="me-auto">{heading}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastHelper;
