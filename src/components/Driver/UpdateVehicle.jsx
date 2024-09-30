import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import ImageUploader from '../../utils/ImageUploader';

const UpdateVehicle = ({ show, handleClose, vehicleNumber }) => {
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState(0);
  const [vehicleImageUrl, setVehicleImageUrl] = useState(''); // State to store image URL
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch vehicle data when modal opens and vehicleNumber is provided
    if (show && vehicleNumber) {
      const fetchVehicleData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/vehicle/get-vehicle/${vehicleNumber}`);
          const vehicleData = response.data.vehicle; // Assuming the vehicle data is in 'vehicle'
          
          setVehicleType(vehicleData.vehicleType);
          setVehicleModel(vehicleData.vehicleModel);
          setVehicleColor(vehicleData.vehicleColor);
          setVehicleOwner(vehicleData.vehicleOwner);
          setVehicleCapacity(vehicleData.seatingCapacity); // Assuming 'seatingCapacity' is the correct field
          setVehicleImageUrl(vehicleData.ImagePath); // Assuming 'ImagePath' holds the URL
        } catch (error) {
            console.error('Error fetching vehicle details:', error.response?.data || error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchVehicleData();
    }
  }, [show, vehicleNumber]);

  // Handle image URL change
  const handleImageUrlChange = (newImageUrl) => {
    setVehicleImageUrl(newImageUrl);
  };

  // Handle form submission to update vehicle
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/v1/vehicle/update-vehicle/${vehicleNumber}`, {
        vehicleType,
        vehicleModel,
        vehicleColor,
        vehicleOwner,
        vehicleCapacity: parseInt(vehicleCapacity),
        images: vehicleImageUrl,
      });

      console.log('Vehicle updated:', response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Vehicle details have been updated successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      handleClose(); // Close the modal after successful update
    } catch (error) {
      console.error('Error updating vehicle:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error updating the vehicle.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Vehicle Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Image Component */}
          <Form.Group>
            <Form.Label>Vehicle Image</Form.Label>
            <ImageUploader onImageUrlChange={handleImageUrlChange} imageUrl={vehicleImageUrl} />
          </Form.Group>

          <Form.Group controlId="formVehicleNumber">
            <Form.Label>Vehicle Number</Form.Label>
            <Form.Control
              type="text"
              value={vehicleNumber}
              disabled
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

          <Form.Group controlId="formVehicleCapacity">
            <Form.Label>Seating Capacity</Form.Label>
            <Form.Control
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
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
          <Button variant="primary" type="submit">
            Update Vehicle
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateVehicle;
