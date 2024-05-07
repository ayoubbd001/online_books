import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { addClient } from "../../store/clientSlice";

export default function AddClient({ isShow, setIsShow }) {
  const handleClose = () => {
    setIsShow(false);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    });
    setErrors({});
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = "Firstname is required";
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = "Lastname is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    dispatch(addClient(formData));
    setIsShow(false);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3">
          <Form onSubmit={handleSub} className="px-2">
            <Form.Group as={Row} className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
              />
              {errors.firstname && (
                <span className="text-danger">{errors.firstname}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
              {errors.lastname && (
                <span className="text-danger">{errors.lastname}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="text-danger">{errors.phone}</span>
              )}
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
