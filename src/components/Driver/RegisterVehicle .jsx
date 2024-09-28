import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import ImageComponent from '../Driver/ImageComponent';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterVehicle = ({ show, handleClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');
  const [vehicleImageUrl, setVehicleImageUrl] = useState(''); // State to store image URL

  // Handle image URL change
  const handleImageUrlChange = (url) => {
    setVehicleImageUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/vehicle', {
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        vehicleOwner,
        vehicleImageUrl, // Add image URL to the payload
      });
      console.log('Vehicle registered:', response.data);
       // SweetAlert success message
       Swal.fire({
        title: 'Success!',
        text: 'Vehicle has been registered successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      handleClose(); // Close the modal after successful registration
    } catch (error) {
      console.error('Error registering vehicle:', error);
      // SweetAlert error message
      Swal.fire({
        title: 'Error!',
        text: 'There was an error registering the vehicle.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{vehicleNumber === '' ? 'Register Vehicle' : 'Update Vehicle'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Image Component */}
          <Form.Group>
            <Form.Label>Vehicle Image</Form.Label>
            <ImageComponent onImageUrlChange={handleImageUrlChange} />
          </Form.Group>

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
            {vehicleNumber === '' ? 'Register Vehicle' : 'Update Vehicle'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterVehicle;
