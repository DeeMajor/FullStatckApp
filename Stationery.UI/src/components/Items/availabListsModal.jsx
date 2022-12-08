import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function AvailableLists(props) {
  const [checkedState, setCheckedState] = useState(
    new Array(props.lists.length).fill(false)
  );
  const [counter, setCounter] = useState(new Array(props.lists.length).fill(1));

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleIncrement = (position) => {
    // Counter state is incremented
    const updaterConter = counter.map((count, index) =>
      index === position ? count + 1 : count
    );
    setCounter(updaterConter);
    setValue(`${position}`, counter[position] + 1);
  };

  const handleDecrement = (position, counte) => {
    // Counter state is decremented
    const updaterConter = counter.map((count, index) =>
      index === position && counte > 1 ? count - 1 : count
    );
    setCounter(updaterConter);
    setValue(`${position}`, counter[position] - 1);
  };

  const onSubmit = (data) => {
    for (let i = 0; i < checkedState.length; i++) {
      if (checkedState[i] === true) {
        console.log(data[`${i}`]);
        props.onAddItem(
          props.lists[i].id,
          props.item.item_Id,
          props.lists[i],
          props.item,
          data[`${i}`]
          /* data.quantity - [i] */
        );
      }
    }

    console.log(checkedState);
    console.log(data);
  };

  return (
    <Modal show={props.show} onHide={() => props.onClose()}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <h6>
            Choose lists to add{" "}
            <span className="text-primary">{props.item.itemName}</span> to
          </h6>
        </Modal.Header>
        <Modal.Body>
          {props.lists.map((list, index) => (
            <React.Fragment key={list.id}>
              <div className="mb-3">
                <div className="row">
                  <div className="col-2 fs-4 ms-4">
                    <Form.Check
                      type="checkbox"
                      id={list.id}
                      label={list.child}
                      value={list.id}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                    />
                  </div>
                  <div className="col-2 smaller-input d-flex flex-row">
                    <i
                      className="btn bi bi-dash-circle-fill fs-3"
                      onClick={() => handleDecrement(index, counter[index])}
                    ></i>

                    {/*  <input
                      type="text"
                      style={{ width: "50px" }}
                      className="form-control"
                      value={counter[index]}
                      {...register(`${index}`)}
                    /> */}
                    <Form.Control
                      type="text"
                      style={{ width: "50px" }}
                      value={counter[index]}
                      {...register(`${index}`)}
                    />
                    <i
                      className="btn bi bi-plus-circle-fill fs-3"
                      onClick={() => handleIncrement(index)}
                    ></i>
                  </div>
                </div>
                <hr />
              </div>
            </React.Fragment>
          ))}
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button variant="dark" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default AvailableLists;
