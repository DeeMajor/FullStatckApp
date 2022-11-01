import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Success(props) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>SUCCESS</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-success">
        Stationery list for{" "}
        <span className="text-primary">{props.listName} </span>has been
        successfuly created.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => props.onClose()}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Success;
