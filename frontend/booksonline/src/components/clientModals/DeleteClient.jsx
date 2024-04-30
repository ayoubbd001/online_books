import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function DeleteClient({ isShow, handleShow }) {
  const handleClose = () => handleShow(false);
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete ayoub bd!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
