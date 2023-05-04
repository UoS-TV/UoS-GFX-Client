import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import configData from "../../config.json";

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
          <Modal.Title>Config file</Modal.Title>
        </Modal.Header>
        <Modal.Body>{JSON.stringify(configData, undefined, 2)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ConfigModal;
