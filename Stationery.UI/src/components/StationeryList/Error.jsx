import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Error(props) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Header closeButton>
        <Modal.Title>ERROR</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-danger">
        <p>Something went wrong, Please try again or contact admin.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={() => props.onClose()}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Error;
