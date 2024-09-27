import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; // Assuming you have a Navbar component
import './CallOperatorDashboard.css'; // You can add custom styling here
import AddPassenger from './AddPassenger';

export default function CallOperatorDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar /> {/* Add Navbar */}
      <Container className="dashboard-container mt-5">
        <Row className="text-center mb-4">
          <Col>
            <h1 className="dashboard-title">Call Operator Dashboard</h1>
            <p className="dashboard-subtitle">Manage rides and passengers easily</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="mb-3">
            <Button
              variant="primary"
              size="lg"
              className="w-100"
              onClick={() => navigate('/RideBooking')}
            >
              Ride Booking
            </Button>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Button
              variant="success"
              size="lg"
              className="w-100"
              onClick={() => navigate('/AddPassenger')}
            >
              Add New Passenger
            </Button>
          </Col>
          <Col md={6} lg={4} className="mb-3">
            <Button
              variant="warning"
              size="lg"
              className="w-100"
              onClick={() => navigate('/ManagePassengerDetails')}
            >
              Manage Passenger Details
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}