import React from 'react';
import { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';


// Passenger Login Page using React Bootstrap
export default function PassengerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

     // Show loading alert
     Swal.fire({
      title: 'Logging in...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await axios.post('http://localhost:3000/api/v1/passenger/login', {
        email,
        password,
      });
      // Extract the token from the response
      const { token } = response.data;
      console.log("Login successful, token: ", token);

      // Show success alert with the token
      Swal.fire({
        icon: 'success',
        title: 'Login successful!',
        text: `Your token is: ${token}`,
        showConfirmButton: true,
        confirmButtonText: 'OK',
      });

     // Optionally, save the token to localStorage
     localStorage.setItem('passengerToken', token);

      // Redirect to dashboard page
      window.location.href = '/PassengerDashboard';

    } catch (error) {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Login failed!',
        text: error.response?.data?.message || 'Please try again.',
        showConfirmButton: true,
        confirmButtonText: 'Retry',
      });
    }
  };

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


            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />

              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />

              </Form.Group>

              <div className="d-flex justify-content-between mb-4">
                <Form.Check type="checkbox" label="Remember me" />
                <a href="!#">Forgot password?</a>
              </div>

              <div className="text-center text-md-start mt-4 pt-2">
                <Button variant="warning" type='submit' size="lg" className="px-5" >
                  Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account? <a href="./PassengerRegister" className="link-danger">Register</a>
                </p>
              </div>
            </Form>
          </Col>
        </Row>


      </Container>

      <Footer />
    </div>
  );
}
