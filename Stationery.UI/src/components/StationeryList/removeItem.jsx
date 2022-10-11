import { Modal, Button } from "react-bootstrap";
import React from "react";

function RemveItem(props) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Body className="text-center">
        <p>
          {" "}
          Remove{" "}
          <span className="text-danger fw-bold">
            <u>{props.item.Name}</u>
          </span>{" "}
          from <span className="fw-bold">{props.list.Name}</span>?
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
            onClick={() => props.onDelete(props.list,props.item.itemId)}
          >
            remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RemveItem;
