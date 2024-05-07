import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { deleteLivre } from "../../store/livreSlice";
export default function DeleteLivre({
  isShow,
  handleShow,
  bookTitle,
  bookCode,
}) {
  const handleClose = () => handleShow(false);
  const dispatch = useDispatch();
  const handleDelete = (code) => {
    console.log(code);
    dispatch(deleteLivre(code));
    handleShow(false);
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete {bookTitle}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleDelete(bookCode)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
