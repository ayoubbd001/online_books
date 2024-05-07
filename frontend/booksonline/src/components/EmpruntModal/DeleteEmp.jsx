import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteEmprunt } from "../../store/empruntSlice";
export default function DeleteEmp({ isShow, handleShow, EmpTitle, EmpCode }) {
  const handleClose = () => handleShow(false);
  const dispatch = useDispatch();
  const handleDelete = (code) => {
    dispatch(deleteEmprunt(code));
    handleShow(false);
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Emp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to delete emprunt for {EmpTitle}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(EmpCode)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
