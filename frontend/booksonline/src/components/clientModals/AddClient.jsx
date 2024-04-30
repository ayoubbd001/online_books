import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddClient({ isShow, setIsShow }) {
  const handleClose = () => setIsShow(false);
  const handleSub = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  // const handleSubmitButtonClick = () => {
  //   if (myForm.current) {
  //     myForm.current.submit();
  //   }

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3">
          <Form onSubmit={() => handleSub(this)} className="px-2">
            <Form.Group as={Row} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fs_name"
                placeholder="first name"
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control name="ls_name" placeholder="last name" />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="client_email" placeholder="email" />
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
