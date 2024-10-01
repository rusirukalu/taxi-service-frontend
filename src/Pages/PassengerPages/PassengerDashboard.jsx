import React, { useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, Autocomplete, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';
import { Button, Form, Container, Row, Col, Card, Modal, ListGroup } from 'react-bootstrap';
import { FaTimes, FaMotorcycle, FaCar, FaTaxi } from 'react-icons/fa';
import axios from 'axios';
import '../../Styles/PassengerDashboard.css';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

const center = { lat: 6.927079, lng: 79.861244 };

export default function PassengerDashboard() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'Api-key',
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const [vehicleType, setVehicleType] = useState('Tuk');
  const [availableVehicles, setAvailableVehicles] = useState({ Tuk: [], Bike: [], Car: [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const destinationRef = useRef();

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                setCurrentPlaceName(results[0].formatted_address);
              }
            }
          });
        },
        () => {
          console.log('Geolocation not supported or permission denied.');
        }
      );
    }
  }, [isLoaded]);
  
  useEffect(() => {
    // Fetch available vehicles by type from API
    async function fetchVehicles() {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/vehicle/get-all-vehicle-types'); // Adjust API endpoint
        setAvailableVehicles(response.data.message);
        console.log(response.data.message);
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    }
  
    // Call the fetchVehicles function
    fetchVehicles();
  }, [vehicleType]); // Effect will run when vehicleType changes
  

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    if (destinationRef.current) {
      destinationRef.current.value = '';
    }
    if (map) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  }

  function calculateCost(distance, vehicleType) {
    const rates = {
      Tuk: { costPerKilometer: 100, costPerMinute: 100 },
      Bike: { costPerKilometer: 70, costPerMinute: 70 },
      Car: { costPerKilometer: 200, costPerMinute: 200 },
    };

    const distanceValue = parseFloat(distance.replace(/ km/, '').replace(',', '.'));
    const durationValue = parseFloat(duration.replace(/ mins/, '').replace(',', '.'));

    const selectedRate = rates[vehicleType];
    const totalCost = selectedRate.costPerKilometer * distanceValue + selectedRate.costPerMinute * durationValue;
    return isNaN(totalCost) ? 0 : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  async function calculateRoute(destination) {
    if (!destination) return;

    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currentLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    if (results && results.routes.length) {
      setDirectionsResponse(results);
      const distance = results.routes[0].legs[0].distance.text;
      const duration = results.routes[0].legs[0].duration.text;
      setCost(calculateCost(distance, vehicleType));
      setDistance(distance);
      setDuration(duration);
    }
  }

  function confirmVehicleSelection() {
    setShowModal(false);
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <Container fluid className="flex-grow-1 p-0">
        <Row style={{ height: '60vh' }}>
          <GoogleMap
            center={currentLocation}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={currentLocation} />
            {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
          </GoogleMap>
        </Row>

        <Row className="justify-content-center align-items-center py-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Book a Ride</Card.Title>
                <Form>
                  <Row className="mb-2">
                    <Col>
                      <Form.Label>PICKUP</Form.Label>
                      <Form.Group controlId="formCurrentLocation">
                        <Form.Control type="text" value={currentPlaceName} readOnly />
                      </Form.Group>
                    </Col>
                    <Col xs="auto">
                      <Button variant="danger" onClick={clearRoute}>
                        <FaTimes />
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mb-2">
                    <Col>
                      <Form.Label>DROP</Form.Label>
                      <Form.Group controlId="formDestination">
                        <Autocomplete
                          onPlaceChanged={() => {
                            const destination = destinationRef.current.value;
                            calculateRoute(destination);
                          }}
                        >
                          <Form.Control type="text" ref={destinationRef} placeholder="Destination" />
                        </Autocomplete>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    {['Tuk', 'Bike', 'Car'].map((type) => (
                      <Col key={type} md={4}>
                        <Card
                          border={vehicleType === type ? 'primary' : 'light'}
                          className="text-center"
                          onClick={() => {
                            setVehicleType(type);
                            setShowModal(true);
                          }}
                        >
                          <Card.Body>
                            {type === 'Tuk' && <FaTaxi size={30} />}
                            {type === 'Bike' && <FaMotorcycle size={30} />}
                            {type === 'Car' && <FaCar size={30} />}
                            <Card.Title>{type}</Card.Title>
                            <Card.Text>Cost: LKR {calculateCost(distance, type)}</Card.Text>
                          </Card.Body>

                        </Card>
                      </Col>
                    ))}
                  </Row>
                  
                  {distance && (
                    <Row className="mt-3">
                      <Col>
                        <p>Distance: {distance}</p>
                        <p>Duration: {duration}</p>
                        <p>Cost: LKR {cost}</p>
                      </Col>
                    </Row>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Select Your {vehicleType}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {availableVehicles[vehicleType]?.length ? (
              <ListGroup>
                {availableVehicles[vehicleType].map((vehicle) => (
                  <ListGroup.Item
                    key={vehicle.id}
                    active={selectedVehicle?.id === vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    {vehicle.vehicleNumber} - {vehicle.vehicleType} - {vehicle.vehicleColor}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>No available {vehicleType}s at the moment.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmVehicleSelection}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
}