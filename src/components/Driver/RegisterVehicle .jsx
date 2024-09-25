import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const RegisterVehicle = ({ show, handleClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/vehicles', {
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        vehicleOwner,
      });
      console.log('Vehicle registered:', response.data);
      handleClose(); // Close the modal after successful registration
    } catch (error) {
      console.error('Error registering vehicle:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formVehicleNumber">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formVehicleType">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              type="text"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formVehicleModel">
            <Form.Label>Vehicle Model</Form.Label>
            <Form.Control
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formVehicleColor">
            <Form.Label>Vehicle Color</Form.Label>
            <Form.Control
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formVehicleOwner">
            <Form.Label>Vehicle Owner</Form.Label>
            <Form.Control
              type="text"
              value={vehicleOwner}
              onChange={(e) => setVehicleOwner(e.target.value)}
              required
            />
          </Form.Group>
          <br/>
          <Button variant="warning" type="submit">
            Register Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterVehicle;
