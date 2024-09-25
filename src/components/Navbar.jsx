import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// NavBar Component Code
export default function NavBar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} expand="lg" bg="light" variant="light">
      <Container fluid>
        <Navbar.Brand href="#">Taxi Service</Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="navbarScroll" 
          onClick={() => setExpanded(expanded ? false : "expanded")} 
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="./Home">Home</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="./PassengerLogin">Passengers</Nav.Link>
            <Nav.Link href="./DriverLogin">Drivers</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
