import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import React from "react";

function CreateList(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.onCreate(data.listName, props.item);
  };

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="">
          <div className="">
            <h6 className="fw-light text-center">
              Create new Stationery List...
            </h6>
          </div>

          <FloatingLabel
            controlId="floatingInput"
            label="Stationery List Name"
            className="my-3 "
          >
            <Form.Control
              type="text"
              placeholder="Stationery List Name"
              {...register("listName")}
            />
          </FloatingLabel>

          <p className="fw-light ms-2">
            <i className="bi bi-plus text-success" role="button"></i>
            <input
              readOnly={true}
              value={props.item.Name}
              placeholder={props.item.Name}
              className="border border-white"
              {...register("item")}
            />
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" onClick={() => props.onClose()}>
            cancel
          </Button>
          <Button variant="secondary" type="submit">
            Save Changes
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateList;
