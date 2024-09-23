import React from 'react'
import { Button, Container, Row, Col, Card, Form, Image } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock, FaKey, FaPhone  } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DriverRegister() {
  return (
    <div>
        <NavBar />
     
      <Container fluid className="p-5">
      <Card className="text-black m-5" style={{ borderRadius: '25px' }}>
        <Card.Body>
          <Row>
            <Col md={10} lg={6} className="order-2 order-lg-1 d-flex flex-column align-items-center">
              <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</h1>


              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaEnvelope size={24} className="me-3" />
                <Form.Control type="email" placeholder="Enter Your Email" />
              </div>
              
              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaUser size={24} className="me-3" />
                <Form.Control type="text" placeholder="Enter Your Full Name" className="w-100" />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaUser size={24} className="me-3" />
                <Form.Control type="text" placeholder="Enter Your UserName" className="w-100" />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaUser  size={24} className="me-3" />
                <Form.Control type="text" placeholder="Enter Your NIC Number" className="w-100" />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaPhone  size={24} className="me-3" />
                <Form.Control type="text" placeholder="Enter Your Phone Number" className="w-100" />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaEnvelope size={24} className="me-3" />
                <Form.Control type="text" placeholder="Enter Your Address" className="w-100" />
              </div>

              <div className="d-flex flex-row align-items-center mb-4 w-100">
                <FaLock size={24} className="me-3" />
                <Form.Control type="password" placeholder="Password" />
              </div>
           

              <Button variant="primary" size="lg" className="mb-4">Register</Button>
            </Col>

            <Col md={10} lg={6} className="order-1 order-lg-2 d-flex align-items-center">
              <Image src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" fluid />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </div>
  )
}
