import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLivre } from "../../store/livreSlice";

export default function AddLivre({ isShow, setIsShow }) {
  const handleClose = () => {
    setIsShow(false);
    setFormData({
      code: "",
      titre: "",
      auteur: "",
      description: "",
    });
    setErrors({});
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    code: "",
    titre: "",
    auteur: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.code.trim()) {
      newErrors.code = "Code is required";
    } else if (!Number.isInteger(Number(formData.code.trim()))) {
      newErrors.code = "Code must be an integer";
    }
    if (!formData.titre.trim()) {
      newErrors.titre = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.auteur.trim()) {
      newErrors.auteur = "auteur is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    dispatch(addLivre(formData));
    setIsShow(false);
  };
  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3">
          <Form onSubmit={(e) => handleSub(e)} className="px-2">
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="code"
                placeholder="code"
                value={formData.code}
              />
              {errors.code && (
                <span className="text-danger">{errors.code}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>titre</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="titre"
                placeholder="titre"
                value={formData.titre}
              />
              {errors.titre && (
                <span className="text-danger">{errors.titre}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Decription</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Description"
                value={formData.description}
              />
              {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Auteur</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="auteur"
                placeholder="auteur"
                value={formData.auteur}
              />
              {errors.auteur && (
                <span className="text-danger">{errors.auteur}</span>
              )}
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
