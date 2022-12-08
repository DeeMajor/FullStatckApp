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
    const newList = {
      Child: data.listName,
      Status: "Uncomplete",
    };

    props.onCreate(newList);
  };

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body className="">
          <div className="">
            <h6 className="fw-light text-center">Who is it for?</h6>
          </div>

          <FloatingLabel
            controlId="floatingInput"
            label="Child's name"
            className="my-3 "
          >
            <Form.Control
              type="text"
              placeholder="Stationery List Name"
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
            Cancel
          </Button>
          <Button variant="dark" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CreateList;
