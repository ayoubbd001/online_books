import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteClient } from "../../store/clientSlice";
import { useDispatch } from "react-redux";

export default function DeleteClient({
  isShow,
  handleShow,
  clientId,
  clientName,
}) {
  const dispatch = useDispatch();
  const handleClose = () => handleShow(false);

  const handleDelete = (id) => {
    dispatch(deleteClient(id));
    handleShow(false);
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete {clientName}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(clientId)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
