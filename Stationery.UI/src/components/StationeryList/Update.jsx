import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import React from "react";

function UpdateList(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const list = props.list;

    list.child = data.listName;
    list.items = [];

    props.onUpdate(list);
  };

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="">
          <FloatingLabel
            controlId="floatingInput"
            label={props.list.child}
            className="my-3 "
          >
            <Form.Control
              type="text"
              placeholder={props.list.child}
              {...register("listName")}
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="outline-secondary" onClick={() => props.onClose()}>
            cancel
          </Button>
          <Button variant="secondary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default UpdateList;
