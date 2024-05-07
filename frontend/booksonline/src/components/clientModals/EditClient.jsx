import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { editClient } from "../../store/clientSlice";

export default function EditClient({ isShow, handleShow, client }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    _id: client._id,
    firstname: client.firstname,
    lastname: client.lastname,
    email: client.email,
    phone: client.phone,
  });

  const handleClose = () => {
    handleShow(false);
    setFormData({
      _id: client._id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      phone: client.phone,
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "firstname is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "lastname is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "email is required";
    }

    if (!formData.phone) {
      newErrors.phone = "phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    dispatch(editClient(formData));
    handleShow(false);
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3">
          <Form className="px-2" onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fisrtname"
                placeholder="first name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Last Name</Form.Label>

              <Form.Control
                name="lastname"
                placeholder="last name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                name="phone"
                placeholder="number phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
