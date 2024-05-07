import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { editLivre } from "../../store/livreSlice";

export default function EditLivre({ isShow, handleShow, livre }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    _id: livre._id,
    code: livre.code,
    titre: livre.titre,
    auteur: livre.auteur,
    description: livre.description,
  });

  const handleClose = () => {
    handleShow(false);
    setFormData({
      _id: livre._id,
      code: livre.code,
      titre: livre.titre,
      auteur: livre.auteur,
      description: livre.description,
    });
  };

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titre.trim()) {
      newErrors.titre = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.auteur.trim()) {
      newErrors.auteur = "Auteur is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(editLivre(formData));
    handleShow(false);
  };

  return (
    <>
      <Modal show={isShow} onHide={() => handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Livre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Titre:
              </Form.Label>
              <Form.Control
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
              />
              {errors.titre && (
                <span className="text-danger">{errors.titre}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Description:
              </Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Auteur:
              </Form.Label>
              <Form.Control
                type="text"
                name="auteur"
                value={formData.auteur}
                onChange={handleChange}
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
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
