import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Error(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}
      className="bg-dark bg-opacity-25"
    >
      <Modal.Header
        className="bg-danger bg-opacity-25"
        closeButton
      ></Modal.Header>
      <Modal.Body className="bg-danger bg-opacity-25 text-center">
        {props.message}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="bg-danger bg-opacity-25"
      >
        <Button variant="dark" onClick={() => props.onClose()}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Error;
