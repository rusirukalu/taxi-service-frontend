import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import NavBar from '../../components/Navbar';

// Driver Login Page using React Bootstrap
export default function DriverLogin() {
  return (
    <div>
      <NavBar />
       
      
      <Container className="p-3 my-5 h-custom">
        <Row>
          <Col md={6}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </Col>

          <Col md={6}>
            <div className="d-flex flex-row align-items-center justify-content-center mb-4">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <Button variant="primary" className="me-2">
                <i className="fab fa-facebook-f"></i>
              </Button>
              <Button variant="info" className="me-2">
                <i className="fab fa-twitter"></i>
              </Button>
              <Button variant="primary" className="me-2">
                <i className="fab fa-linkedin-in"></i>
              </Button>
            </div>

            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
              <hr className="flex-grow-1" />
            </div>

            <Form>
              <Form.Group className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" size="lg" />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" size="lg" />
              </Form.Group>

              <div className="d-flex justify-content-between mb-4">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="!#">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <Button variant="primary" size="lg" className="px-5">
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account? <a href="./DriverRegister" className="link-danger">Register</a>
                </p>
              </div>
            </Form>
          </Col>
        </Row>

        
      </Container>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary mt-5">
          <div className="text-white mb-3 mb-md-0">Copyright © 2024. All rights reserved.</div>
          <div>
            <Button variant="link" className="text-white mx-2">
              <i className="fab fa-facebook-f"></i>
            </Button>
            <Button variant="link" className="text-white mx-2">
              <i className="fab fa-twitter"></i>
            </Button>
            <Button variant="link" className="text-white mx-2">
              <i className="fab fa-google"></i>
            </Button>
            <Button variant="link" className="text-white mx-2">
              <i className="fab fa-linkedin-in"></i>
            </Button>
          </div>
        </div>
    </div>
  );
}
