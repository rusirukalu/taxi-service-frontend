import React, { useState, useRef, useEffect } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Form, Button, InputGroup, Card, Row, Col } from 'react-bootstrap';

// Default center (Colombo, Sri Lanka)
const center = { lat: 6.927079, lng: 79.861244 };

function MapComponent({ currentLocation, destination, onBookingDataChange }) {
  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "your_api-key", // Replace with your API key
    libraries: ['places'], // Include necessary libraries
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [cost, setCost] = useState(0);
  const [mapCenter, setMapCenter] = useState(center); // State for the map's center
  const [mapVisible, setMapVisible] = useState(true);
  const [currentPlaceName, setCurrentPlaceName] = useState('');
  const destinationRef = useRef();

  // Function to calculate cost based on distance, duration, and vehicle type
  function calculateCost(distance, duration) {
    const distanceValue = parseFloat(distance.replace(/ km/, '').replace(',', '.'));
    const durationValue = parseFloat(duration.replace(/ mins/, '').replace(',', '.'));

    const costPerKilometer = 350; // Example rate per km
    const costPerMinute = 100; // Example rate per minute
    const totalCost = (costPerKilometer * distanceValue) + (costPerMinute * durationValue);

    if (isNaN(totalCost)) {
      return 0;
    }
    return totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Fetch the current location using browser's Geolocation API when the component is mounted
  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setMapCenter(location);

          // Use Geocoder to get the address of the current location
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
  }, [isLoaded]);

  // Function to calculate route between currentLocation and destination
  useEffect(() => {
    if (currentLocation && destination) {
      calculateRoute(currentLocation, destination);
    }
  }, [currentLocation, destination]);

  // Function to calculate and display the route
  async function calculateRoute(origin, destination) {
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin,
      destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    const routeDistance = results.routes[0].legs[0].distance.text;
    const routeDuration = results.routes[0].legs[0].duration.text;

    const rideCost = calculateCost(routeDistance, routeDuration);
    setCost(rideCost);
    setDistance(routeDistance);
    setDuration(routeDuration);

    // Send the updated booking data to the parent component
    const bookingData = {
      currentLocation: origin,
      destination,
      distance: routeDistance,
      duration: routeDuration,
      cost: rideCost,
    };

  }

  const closeMap = () => {
    setMapVisible(false); // Set the map visibility to false
  };

  if (!isLoaded || !mapVisible) {
    return null; // Don't render the map if not loaded or if it's closed
  }

  return (
    <div>
      {/* Full-screen Google Map */}
      <GoogleMap
        center={currentLocation || center}
        zoom={14}
        mapContainerStyle={{ width: '100%', height: '535px' }}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        <Marker position={currentLocation || center} />
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
                  value={currentLocation ? currentLocation : 'Unknown'}
                  readOnly
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="Destination"
                ref={destinationRef}
                value={destination ? destination : ''}
                readOnly
              />
            </Col>
          </Row>

          <Row className="mt-1">
            <Col md={4}>
              <p>Distance: {distance ? distance : 0} </p>
            </Col>
            <Col md={4}>
              <p>Duration: {duration ? duration : 0} </p>
            </Col>
            <Col md={4}>
              <p>Total Cost: LKR {cost}</p>
            </Col>
          </Row>

          {/* Close Button */}
          <Button variant="secondary" onClick={closeMap}>
            Close
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default MapComponent;
