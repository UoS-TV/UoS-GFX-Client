import React, { useState } from "react";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Trash } from "react-bootstrap-icons";

function LoadRundownModal({
  show,
  rundowns,
  onClose,
  onRundownLoad,
  listRundowns,
}) {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedRundown, setSelectedRundown] = useState(null);

  const openConfirmationModal = (rundown) => {
    setSelectedRundown(rundown);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setSelectedRundown(null);
    setShowConfirmationModal(false);
  };

  const handleDeleteRundown = (rundown) => {
    openConfirmationModal();
  
    // Handle the deletion when the user confirms
    const confirmDelete = () => {
      Axios.delete(`http://localhost:3002/delete-rundown/${rundown.id}`)
        .then((response) => {
          console.log("Rundown deleted successfully", response.data);
          // Optionally, you can refresh the list of rundowns here.
          listRundowns();
        })
        .catch((error) => {
          console.error("Error deleting rundown:", error);
        });
      closeConfirmationModal();
    };
  
    
    confirmDelete();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Select a Rundown</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rundowns.map((rundown) => (
          <InputGroup
            key={rundown.id}
            className="mb-2 d-flex justify-content-between align-items-center"
          >
            <InputGroup.Text className="flex-grow-1">
              {rundown.rundownName}
            </InputGroup.Text>
            <Button variant="primary" onClick={() => onRundownLoad(rundown)}>
              Load
            </Button>
            <Button
              variant="danger"
              onClick={() => openConfirmationModal(rundown)}
            >
              <Trash />
            </Button>
            {/* Confirmation Modal */}
            <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Alert variant="danger">
                  <p>Are you sure you want to delete this rundown?</p>
                  {rundown.rundownName}
                  <br />({rundown.id})
                </Alert>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeConfirmationModal}>
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteRundown(selectedRundown);
                    // closeConfirmationModal();
                  }}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </InputGroup>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoadRundownModal;
