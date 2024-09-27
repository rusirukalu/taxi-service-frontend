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

const center = { lat: 6.927079, lng: 79.861244 };

function PassengerDashboard() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8',
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

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currentLocation,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    const distance = results.routes[0].legs[0].distance.text;
    const duration = results.routes[0].legs[0].duration.text;

    const rideCost = calculateCost(distance, vehicleType);
    setCost(rideCost);
    setDistance(distance);
    setDuration(duration);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    destiantionRef.current.value = '';
    
    // Center the map back to the current location
    if (map) {
      map.setCenter(currentLocation);
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

    console.log(bookingData);
  }

  return (
    <Container fluid className="p-0" style={{ height: '100vh' }}>
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

      <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1 }}>
        <Card>
          <Card.Body>
            <Card.Title className="text-center">Book a Ride</Card.Title>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="formCurrentLocation">
                    <Form.Control
                      type="text"
                      placeholder="Current Location"
                      value={currentPlaceName}
                      readOnly
                      style={{ cursor: 'not-allowed', width: '200px' }}
                    />
                  </Form.Group>
                </Col>
                <Col>
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
                        style={{ width: '200px' }}
                      />
                    </Autocomplete>
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant="danger" onClick={clearRoute}>
                    <FaTimes />
                  </Button>
                </Col>
              </Row>

              <Row className="mt-3">
                {['standard', 'bike', 'luxury'].map(type => (
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
                        <Card.Text>
                          Cost: LKR {calculateCost(distance, type)}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <Row className="mt-3">
                <Col>
                  <div>Distance: {distance}</div>
                  <div>Duration: {duration}</div>
                </Col>
              </Row>

              <Button variant="success" className="mt-3 w-100" onClick={handleBooking}>
                Book Now
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default PassengerDashboard;
