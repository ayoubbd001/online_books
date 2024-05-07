import React from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { markEmpruntReturned } from "../../store/empruntSlice";

export default function Edit({ isShow, handleShow, idEmp }) {
  const handleClose = () => handleShow(false);
  const dispatch = useDispatch();

  const handleEdit = (id) => {
    dispatch(markEmpruntReturned(id));
    handleShow(false);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Emprunt</Modal.Title>
        </Modal.Header>
        <Modal.Body>Mark as returned </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEdit(idEmp)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
