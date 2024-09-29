import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImageUploader from '../../utils/ImageUploader'

const RegisterVehicle = ({ show, handleClose }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car'); // Default vehicle type
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('me'); // Default vehicle owner
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleImageUrl, setVehicleImageUrl] = useState(''); // State to store image URL

  // Handle image URL change
  const handleImageUrlChange = (newImageUrl) => {
    setVehicleImageUrl(newImageUrl);
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/v1/vehicle/create-vehicle', {
        vehicleNumber,
        vehicleType,
        vehicleModel,
        vehicleColor,
        vehicleOwner,
        vehicleCapacity: parseInt(vehicleCapacity),
        images: vehicleImageUrl,
      });
      console.log('Vehicle registered:', response.data);
      // SweetAlert success message
      Swal.fire({
        title: 'Success!',
        text: 'Vehicle has been registered successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      // Close the modal after successful registration
      handleClose();

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
        <Modal.Title>Register Vehicle</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Image Component */}
          <Form.Group>
            <Form.Label>Vehicle Image</Form.Label>
            <ImageUploader onImageUrlChange={handleImageUrlChange} />
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

          {/* Vehicle Type Dropdown */}
          <Form.Group controlId="formVehicleType">
            <Form.Label>Vehicle Type</Form.Label>
            <Form.Control
              as="select"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="tuk">Tuk</option>
            </Form.Control>
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

          {/* Seating Capacity */}
          <Form.Group controlId="formVehicleCapacity">
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)} // Ensure it's a number
              required
            />
          </Form.Group>

          {/* Vehicle Owner Dropdown */}
          <Form.Group controlId="formVehicleOwner">
            <Form.Label>Vehicle Owner</Form.Label>
            <Form.Control
              as="select"
              value={vehicleOwner}
              onChange={(e) => setVehicleOwner(e.target.value)}
              required
            >
              <option value="me">Me</option>
              <option value="otherPerson">Other Person</option>
            </Form.Control>
          </Form.Group>

          <br />
          <Button variant="warning" type="submit">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterVehicle;
