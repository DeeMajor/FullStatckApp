import { Modal, Button } from "react-bootstrap";
import React from "react";

function RemoveItem(props) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Body className="text-center">
        <p>
          {" "}
          Remove{" "}
          <span className="text-danger fw-bold">
            <u>{props.item.itemName}</u>
          </span>{" "}
          from <span className="fw-bold">{props.list.child}</span>?
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
            onClick={() => props.onDelete(props.list, props.item.id)}
          >
            remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveItem;
