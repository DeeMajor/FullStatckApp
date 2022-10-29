import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function Success(props) {
  return (
    <Modal
      size=""
      show={props.show}
      onClick={() => props.onClose()}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Body className="bg-success" closeButton>
        Successfully added item
        <i
          className=" ms-2 me-1 bi bi-plus-circle-fill link-dark float-end"
          role="button"
        ></i>
      </Modal.Body>
    </Modal>
  );
}

export default Success;
