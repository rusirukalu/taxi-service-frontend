import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, ListGroup, ProgressBar, Image } from 'react-bootstrap';
import { FaCar } from 'react-icons/fa';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Logout from '../../components/Logout';
import EditProfileModal from '../../components/Driver/EditProfileModal';
import MapComponent from '../../components/Driver/MapComponent';
import RegisterVehicle from '../../components/Driver/RegisterVehicle ';
import axios from 'axios';



export default function DriverDashboard() {
  const [driver, setDriver] = useState({ fullName: '', email: '', username: '', nic: '', phone: '', address: '' });
  const [showModal, setShowModal] = useState(false);  // Modal visibility state
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editNic, setEditNic] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const navigate = useNavigate();

  //--------------fetch driver------------------//
  useEffect(() => {
    const token = localStorage.getItem('driverToken');

    if (!token) {
      navigate('/DriverLogin'); // Redirect to login if no token is present
    } else {
      axios.get('http://localhost:3000/api/v1/driver/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          console.log('Driver Profile:', response.data.data);
          const driverData = response.data.data;
          setDriver(driverData);

          // Set edit fields with fetched profile data
          setEditName(driverData.fullName);
          setEditEmail(driverData.email);
          setEditUsername(driverData.username);
          setEditNic(driverData.nic);
          setEditPhone(driverData.phone);
          setEditAddress(driverData.address);
        })
        .catch(error => {
          console.error('Error fetching driver profile:', error);
          navigate('/DriverDashboard'); // Redirect if there is an error
        });
    }
  }, [navigate]);

  // Handle modal open
  const handleShow = () => setShowModal(true);

  // Handle modal close
  const handleClose = () => setShowModal(false);

  // Handle modal open for vehicle registration
  const handleShowVehicleModal = () => setShowVehicleModal(true);

  // Handle modal close for vehicle registration  
  const handleCloseVehicleModal = () => setShowVehicleModal(false);


  // Handle form submission (e.g., update profile)
  const handleSaveChanges = () => {
    // Add logic to save changes (e.g., send update request to backend)
    console.log('Updated name:', editName);
    console.log('Updated email:', editEmail);
    console.log('Updated username:', editUsername);
    console.log('Updated NIC:', editNic);
    console.log('Updated phone:', editPhone);
    console.log('Updated address:', editAddress);

    // Close the modal after saving
    setShowModal(false);
  };

  return (
    <div>
      {/*Navigation Bar */}
      <NavBar />

      <Container fluid className="p-4" >
        <Row>
          {/*Driver Dashboard Title */}
          <Col md={10}>
            <h2 className="mb-4" style={{ color: 'orange', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', textAlign: 'center' }}>
              Driver's Dashboard
            </h2>
          </Col>

          {/*Vehicle Register Button */}
          <Col md={2}>
            <Button variant="warning" style={{ borderRadius: '50px' }} onClick={handleShowVehicleModal}>
              <FaCar style={{ marginRight: '8px' }} />
              Add Your Vehicle
            </Button>
          </Col>
        </Row>




        {/* Summary Cards */}
        <Row className="mb-4">
          <Col md={4}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title>Today's Earnings</Card.Title>
                <Card.Text>
                  <h3>Rs. 1200.50</h3>
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

          {/*Google Map  */}
          <Col md={8}>
            <MapComponent />
          </Col>

          <Col md={4}>


            <Card>
              <Card.Header>Driver Profile</Card.Header>
              <Card.Body className="text-center">
                {/* Display Driver's Profile Image */}
                <Image

                  src="https://cdn-icons-png.flaticon.com/512/8583/8583437.png"
                  roundedCircle
                  fluid
                  style={{ width: '120px', height: '120px' }}
                  alt="Driver Profile"
                />
                <p className="mt-3"><strong>Name: </strong>{driver?.name || 'Loading...'}</p>
                <p><strong>Email: </strong>kavindu</p>
                <Button variant="warning" onClick={handleShow}>Edit Profile</Button>
              </Card.Body>
            </Card>

<br/>

            <Card className="mb-4">
            <Card.Header>Vehicle Details</Card.Header>
              <Card.Body className="text-center">
                {/* Display Driver's Profile Image */}
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgVoBr3mBhjiroEm4lwp_j8nts8q661M-Pw&s"
                  roundedCircle
                  fluid
                  style={{ width: '120px', height: '120px' }}
                  alt="Vehicle Details"
                />
                <p className="mt-3"><strong>Vehicle Number: </strong>{driver?.name || 'Loading...'}</p>
                <p><strong>Vehicle Type: </strong>{driver?.name || 'Loading...'}</p>
                <Button variant="success" onClick={handleShowVehicleModal}><strong>Update</strong></Button>
              </Card.Body>
            </Card>

            {/* Use the EditProfileModal component */}
            <EditProfileModal
              show={showModal}
              handleClose={handleClose}
              editName={editName}
              setEditName={setEditName}
              editEmail={editEmail}
              setEditEmail={setEditEmail}
              editUsername={editUsername}
              setEditUsername={setEditUsername}
              editNic={editNic}
              setEditNic={setEditNic}
              editPhone={editPhone}
              setEditPhone={setEditPhone}
              editAddress={editAddress}
              setEditAddress={setEditAddress}
              handleSaveChanges={handleSaveChanges}
            />


            {/* Vehicle Registration Modal */}
            <RegisterVehicle
              show={showVehicleModal}
              handleClose={handleCloseVehicleModal}
            />
          </Col>

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


        </Row>
      </Container>

      <Logout />
      <Footer />
    </div>
  );
}
