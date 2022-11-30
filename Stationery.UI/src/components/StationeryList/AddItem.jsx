import { Modal, Button } from "react-bootstrap";
import React from "react";

function AddItem(props) {
  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <Modal.Body className="text-center">
        <p>
          {" "}
          Added{" "}
          <span className="text-danger fw-bold">
            <u>{props.item.itemName}</u>
          </span>{" "}
          To <span className="fw-bold">{props.list.child}</span>successfully ...
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
            /*  onClick={() => props.onDelete(props.list, props.item.id)} */
          >
            remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddItem;
