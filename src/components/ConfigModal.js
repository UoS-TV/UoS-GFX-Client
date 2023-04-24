import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SaveConfig = () => {
    console.log("function to save config file");
};

const ConfigModal = ({ isModalVisible, handleShow }) => {
  return (
    <div>
      <Modal
        show={isModalVisible}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={SaveConfig}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfigModal;
