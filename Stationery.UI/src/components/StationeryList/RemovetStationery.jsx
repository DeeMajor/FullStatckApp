import { Modal, Button } from "react-bootstrap";
import React from "react";

function RemoveStationery(id) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Body className="text-center">
        <p>
          {" "}
          Remove{" "}
          <span className="text-danger fw-bold">
            <u>{props.list.Name}</u>
          </span>
          ?
        </p>
        <div className="">
          <Button
            className="me-2 btn-sm"
            variant="secondary"
            onClick={() => props.onClose()}
          >
            cancel
          </Button>
          <Button
            className="ms-2 btn-sm"
            variant="danger"
            onClick={() => props.onDelete(props.list)}
          >
            remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveStationery;
id;
