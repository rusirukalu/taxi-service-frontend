import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import { MdCheckCircle } from "react-icons/md";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import Swal from 'sweetalert2';

const center = { lat: 6.927079, lng: 79.861244 };

export default function Scheduleride({ bookingDetails = {} }) {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [pickupTime, setPickupTime] = useState(bookingDetails.pickupTime || '');
  const [pickupDate, setPickupDate] = useState(bookingDetails.pickupDate || '');
  const [pickupLocation, setPickupLocation] = useState(bookingDetails.pickupLocation || '');
  const [dropLocation, setDropLocation] = useState(bookingDetails.dropLocation || '');
  const [rideStatus, setRideStatus] = useState(bookingDetails.status || '');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'Your-API-Key',
    libraries: ['places'],
  });

  useEffect(() => {
    if (bookingDetails) {
      setConfirmationMessage(
        `Your booking for ${bookingDetails.pickupDate || ''} at ${bookingDetails.pickupTime || ''} has been ${bookingDetails.status || ''}. Your driver will be assigned 15 to 30 minutes before the specified time, and trip details will be shared then. The trip fare may change depending on availability.`
      );
    }
  }, [bookingDetails]);

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        () => {
          console.log('Geolocation not supported or permission denied.');
        }
      );
    }
  }, [isLoaded]);

  const handleBackClick = () => {
    navigate('/PassengerDashboard');
  };

  const handleDoneClick = () => {
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please select a rating before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    Swal.fire({
      title: 'Thank You!',
      text: `You rated your ride ${rating} stars.`,
      icon: 'success',
      confirmButtonText: 'Close'
    }).then((result) => {
      if (result.isConfirmed) {
        setShowRatingModal(false);
        setRating(0);
        // Here you would typically send the rating to your backend
        console.log(`Submitted rating: ${rating}`);
        // Navigate to Home.jsx
        navigate('/Home');
      }
    });
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid className="p-0 position-relative" style={{ height: '100vh', backgroundColor: '#4CAF50' }}>
      <div className="position-absolute top-0 start-0 p-3">
        <FaArrowLeft color="black" size={24} onClick={handleBackClick} />
      </div>
      <div className="position-absolute top-0 end-0 p-3">
        <BsInfoCircle color="black" size={24} />
      </div>

      <Row style={{ height: '60%' }}>
        <GoogleMap
          center={currentLocation}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={currentLocation} />
        </GoogleMap>
      </Row>

      <Card className="position-absolute bottom-0 start-0 end-0" style={{ borderTopLeftRadius: '20px', borderTopRightRadius: '20px' }}>
        <Card.Body>
          <Row className="align-items-center mb-3">
            <Col xs="auto">
              <MdCheckCircle color={rideStatus === 'Confirmed' ? "#4CAF50" : "red"} size={24} />
            </Col>
            <Col>
              <h5 className="mb-0">Scheduled Ride {rideStatus}</h5>
            </Col>
          </Row>

          <h6 className="text-muted mb-3">Pickup Date & Time</h6>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="pickupTime">
                <Form.Label>Pick-up Time</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="pickupDate">
                <Form.Label>Pick-up Date</Form.Label>
                <Form.Control
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={2} className="text-primary">PICKUP</Col>
            <Col>
              <Form.Control
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={2} className="text-danger">DROP</Col>
            <Col>
              <Form.Control
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
              />
            </Col>
          </Row>

          <Card className="bg-light border-0 mb-3">
            <Card.Body>
              {confirmationMessage}
            </Card.Body>
          </Card>

          <Button variant="primary" className="w-100" onClick={handleDoneClick}>Done</Button>
        </Card.Body>
      </Card>

      <Modal show={showRatingModal} onHide={handleCloseRatingModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rate Your Ride</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>How was your experience? Please rate your ride:</p>
          <div className="star-rating d-flex justify-content-center">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  aria-label={`Rate ${index} out of 5 stars`}
                >
                  <FaStar color={index <= (hover || rating) ? "#ff0000" : "#e4e5e9"} size={32} />
                </button>
              );
            })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRatingModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRatingSubmit}>
            Submit Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}