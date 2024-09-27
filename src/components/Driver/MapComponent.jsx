import React, { useState, useRef, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Form, Button, InputGroup, Dropdown, Card, Row, Col } from 'react-bootstrap';

const center = { lat: 6.927079, lng: 79.861244 }; // Default center (Colombo, Sri Lanka)

function MapComponent() {
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8",
    libraries: ['places'], // Include necessary libraries
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(center);
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const [vehicleType, setVehicleType] = useState('standard');
  
  const destinationRef = useRef(); // Destination reference for Autocomplete input

  // Function to calculate cost based on distance, duration, and vehicle type
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
    if (isNaN(totalCost)) {
      return 0;
    }

    // Format the cost with commas and two decimal places
    return totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Get the current location when the component is mounted
  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCurrentLocation(location);

          // Using google after isLoaded is true
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
              setCurrentPlaceName(results[0].formatted_address);
            }
          });
        },
        () => {
          console.log("Geolocation not supported or permission denied.");
        }
      );
    }
  }, [isLoaded]); // Ensure it runs after isLoaded is true

  // Function to calculate route
  async function calculateRoute(destination) {
    if (!destination) return;

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: currentLocation,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    const routeDistance = results.routes[0].legs[0].distance.text;
    const routeDuration = results.routes[0].legs[0].duration.text;

    const rideCost = calculateCost(routeDistance, vehicleType);
    setCost(rideCost);
    setDistance(routeDistance);
    setDuration(routeDuration);
  }

  // Clear the route and reset fields
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    destinationRef.current.value = '';
  }

  // Function to handle booking
  function handleBooking() {
    const bookingData = {
      currentLocation,
      currentPlaceName,
      destination: destinationRef.current.value,
      distance,
      duration,
      cost,
      
    };

    console.log('Booking data:', bookingData);
  }

  if (!isLoaded) {
    return <div>Loading...</div>; // Don't render map until API is loaded
  }

  return (
    <div>
      {/* Full-screen Google Map */}
      <GoogleMap
        center={currentLocation}
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '535px' }}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        <Marker position={currentLocation} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>

      {/* Control Panel */}
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Current Location"
                  value={currentPlaceName}
                  readOnly
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Autocomplete onPlaceChanged={() => calculateRoute(destinationRef.current.value)}>
                <Form.Control
                  type="text"
                  placeholder="Destination"
                  ref={destinationRef}
                />
              </Autocomplete>
            </Col>
           
          </Row>

          <Row className="mt-1">
            
            <Col md={4}>
              <p>Distance: {distance ? distance : 0}</p>
            </Col>
            <Col md={4}>
              <p>Duration: {duration ? duration : 0}</p>
            </Col>
            <Col md={4}>
              <p>Total Cost: LKR {cost}</p>
            </Col>
          </Row>


        </Card.Body>
      </Card>
    </div>
  );
}

export default MapComponent;
