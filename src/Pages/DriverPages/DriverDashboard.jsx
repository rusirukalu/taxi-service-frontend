import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, ProgressBar, Navbar } from 'react-bootstrap';
import NavBar from '../../components/Navbar';


export default function DriverDashboard() {
  return (
    <div>
      <NavBar/>
    <Container fluid className="p-4">
      
      <h2 className="mb-4">Driver's Dashboard</h2>

      {/* Summary Cards */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Today's Earnings</Card.Title>
              <Card.Text>
                <h3>$120.50</h3>
              </Card.Text>
              <Button variant="primary">View Details</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Rides</Card.Title>
              <Card.Text>
                <h3>8</h3>
              </Card.Text>
              <Button variant="success">View History</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Rating</Card.Title>
              <Card.Text>
                <h3>4.8 <span style={{ color: 'gold' }}>★</span></h3>
              </Card.Text>
              <Button variant="info">View Reviews</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Dashboard sections */}
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>Upcoming Rides</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Ride #1:</strong> Pickup at 10:00 AM - Downtown
                <Button variant="link" className="float-right">Details</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Ride #2:</strong> Pickup at 12:30 PM - Airport
                <Button variant="link" className="float-right">Details</Button>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Ride #3:</strong> Pickup at 2:45 PM - Shopping Mall
                <Button variant="link" className="float-right">Details</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header>Weekly Earnings Goal</Card.Header>
            <Card.Body>
              <h5>$450 / $600</h5>
              <ProgressBar now={75} label="75%" />
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Driver Profile</Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> johndoe@example.com</p>
              <Button variant="warning">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
}
