import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Success(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => props.onClose()}
      className="bg-dark bg-opacity-25"
    >
      <Modal.Header
        className="bg-success bg-opacity-25"
        closeButton
      ></Modal.Header>
      <Modal.Body className="bg-success bg-opacity-25 text-center">
        {props.message}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
        }}
        className="bg-success bg-opacity-25"
      >
        <Button variant="dark" onClick={() => props.onClose()}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Success;
