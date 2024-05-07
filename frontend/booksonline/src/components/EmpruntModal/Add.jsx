import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addEmprunt } from "../../store/empruntSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function AddEmprunt({ isShow, setIsShow }) {
  const [listClient, setListClient] = useState([]);
  const [listLivre, setListLivre] = useState([]);
  const [formData, setFormData] = useState({
    livreCode: "",
    clientId: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleClose = () => {
    setIsShow(false);
    setFormData({
      livreCode: "",
      clientId: "",
    });
    setErrors({});
  };

  const getClient = async () => {
    try {
      const res = await axios.get("http://localhost:3005/api/v1/clients");
      if (res.data.clients) {
        setListClient(res.data.clients);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const getLivres = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/v1/livres");
      if (res.data.livres) {
        setListLivre(res.data.livres);
      }
    } catch (error) {
      console.error("Error fetching livres:", error);
    }
  };

  useEffect(() => {
    getClient();
    getLivres();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientId) {
      newErrors.clientId = "Client is required";
    }
    if (!formData.livreCode) {
      newErrors.livreCode = "Livre is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSub = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    dispatch(addEmprunt(formData));
    setIsShow(false);
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Emprunt</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-3">
          <Form onSubmit={handleSub} className="px-2">
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Livre</Form.Label>
              <Form.Select size="sm" name="livreCode" onChange={handleChange}>
                <option value="">Select Livre</option>
                {listLivre.map((livre) => (
                  <option key={livre._id} value={livre.code}>
                    {livre.titre}
                  </option>
                ))}
              </Form.Select>
              {errors.livreCode && (
                <span className="text-danger">{errors.livreCode}</span>
              )}
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Select size="sm" name="clientId" onChange={handleChange}>
                <option value="">Select Client</option>
                {listClient.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.fullName}
                  </option>
                ))}
              </Form.Select>
              {errors.clientId && (
                <span className="text-danger">{errors.clientId}</span>
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
