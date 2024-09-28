import React, { useRef, useState, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { FaTimes, FaMotorcycle, FaCar, FaTaxi } from 'react-icons/fa';
import axios from 'axios';  // Import Axios for API requests
import '../../Styles/PassengerDashboard.css';
import NavBar from '../../components/Navbar';
import Footer from '../../components/Footer';

const center = { lat: 6.927079, lng: 79.861244 };

function PassengerDashboard() {
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
  const [vehicleType, setVehicleType] = useState('standard');
  const destiantionRef = useRef();

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
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
        },
        () => {
          console.log('Geolocation not supported or permission denied.');
        }
      );
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  function calculateCost(distance, vehicleType) {
    const rates = {
      standard: { costPerKilometer: 350, costPerMinute: 350 },
      bike: { costPerKilometer: 200, costPerMinute: 200 },
      luxury: { costPerKilometer: 750, costPerMinute: 750 },
    };

    const distanceValue = parseFloat(distance.replace(/ km/, '').replace(',', '.'));
    const durationValue = parseFloat(duration.replace(/ mins/, '').replace(',', '.'));

    const selectedRate = rates[vehicleType] || rates.standard;

    const totalCost = (selectedRate.costPerKilometer * distanceValue) + (selectedRate.costPerMinute * durationValue);
    return isNaN(totalCost) ? 0 : totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  async function calculateRoute(destination) {
    if (!destination) {
      return;
    }

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

      const rideCost = calculateCost(distance, vehicleType);
      setCost(rideCost);
      setDistance(distance);
      setDuration(duration);
    } else {
      console.error('No route found');
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    if (destiantionRef.current) {
      destiantionRef.current.value = '';
    }
    if (map) {
      map.panTo(currentLocation);
      map.setZoom(15);
    }
  }

  async function handleBooking() {
    const bookingData = {
      currentLocation,
      currentPlaceName,
      destination: destiantionRef.current.value,
      distance,
      duration,
      cost,
      vehicleType,
    };

    try {
      const response = await axios.post('/api/book-ride', bookingData);
      if (response.status === 200) {
        alert('Ride booked successfully!');
      } else {
        alert('Failed to book the ride.');
      }
    } catch (error) {
      console.error('Error booking ride:', error);
      alert('Error booking ride.');
    }
  }

  return (
    <Container fluid className="p-0" style={{ height: '100vh' }}>
      <NavBar />
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
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Row>

      <Row className="justify-content-center align-items-center" style={{ padding: '20px', height: '40%' }}>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center">Book a Ride</Card.Title>
              <Form>
                <Row className="mb-2">
                  <Col>
                    <Form.Label>PICKUP</Form.Label>
                    <Form.Group controlId="formCurrentLocation">
                      <Form.Control
                        type="text"
                        placeholder="Current Location"
                        value={currentPlaceName}
                        readOnly
                        style={{ cursor: 'not-allowed' }}
                      />
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
                          const destination = destiantionRef.current.value;
                          calculateRoute(destination);
                        }}
                      >
                        <Form.Control
                          type="text"
                          placeholder="Destination"
                          ref={destiantionRef}
                        />
                      </Autocomplete>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-3">
                  {['standard', 'bike', 'luxury'].map((type) => (
                    <Col key={type} md={4} className="mb-2">
                      <Card
                        border={vehicleType === type ? 'primary' : 'light'}
                        className="text-center"
                        onClick={() => {
                          setVehicleType(type);
                          const rideCost = calculateCost(distance, type);
                          setCost(rideCost);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <Card.Body>
                          {type === 'standard' && <FaCar size={30} />}
                          {type === 'bike' && <FaMotorcycle size={30} />}
                          {type === 'luxury' && <FaTaxi size={30} />}
                          <Card.Title>{type.charAt(0).toUpperCase() + type.slice(1)}</Card.Title>
                          <Card.Text>Cost: LKR {calculateCost(distance, type)}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Row className="mt-3">
                  <Col>
                    <Button
                      variant="primary"
                      onClick={handleBooking}
                      disabled={!directionsResponse}
                    >
                      Book Ride
                    </Button>
                  </Col>
                </Row>
                
                <Row className="mt-3">
                  <Col>
                    <h6>Distance: {distance}</h6>
                    <h6>Duration: {duration}</h6>
                    <h6>Cost: LKR {cost}</h6>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Footer />
      </Row>
    </Container>
  );
}

export default PassengerDashboard;
