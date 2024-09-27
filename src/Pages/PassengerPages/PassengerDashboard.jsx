import {
  Box,
  Button,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaTimes, FaMotorcycle, FaCar, FaTaxi } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';

const center = { lat: 6.927079, lng: 79.861244 };

function PassengerDashboard() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8", // Replace with your actual API Key
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

  const destinationRef = useRef(); // Fixed typo: "destiantionRef"

  // Fetch current location
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
              console.log("Geocoder failed due to: " + status);
            }
          });
        },
        () => {
          console.log("Geolocation not supported or permission denied.");
        }
      );
    }
  }, [isLoaded]);

  // Show loading state while the Google Maps API is loading
  if (!isLoaded) {
    return <SkeletonText />;
  }

  // Function to calculate cost based on distance and vehicle type
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

  // Function to calculate route
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

  // Function to clear the route and reset values
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setCost(0);
    destinationRef.current.value = '';
  }

  // Function to handle booking
  async function handleBooking() {
    const bookingData = {
      currentLocation,
      currentPlaceName,
      destination: destinationRef.current.value,
      distance,
      duration,
      cost,
      vehicleType,
    };

    console.log(bookingData);
    // Here you can implement your booking logic (e.g., sending to an API)
  }

  return (
    <Box h="100vh" w="100vw" position="relative">
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
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <Box position="absolute" top={4} left={4} p={4} bg="white" borderRadius="md" shadow="md" w={600}>
        <Text fontSize="xl" fontWeight="bold" marginBottom={2} align="center">Book a Ride</Text>
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Input
              type="text"
              placeholder="Current Location"
              value={currentPlaceName}
              isReadOnly
            />
          </Box>
          <Box flexGrow={1}>
            <Autocomplete
              onPlaceChanged={() => {
                const destination = destinationRef.current.value;
                calculateRoute(destination);
              }}
            >
              <Input
                type="text"
                placeholder="Destination"
                ref={destinationRef}
              />
            </Autocomplete>
          </Box>

          <IconButton
            aria-label="clear route"
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </HStack>

        <SimpleGrid columns={3} spacing={4} mt={4}>
          {['standard', 'bike', 'luxury'].map(type => (
            <Box
              key={type}
              borderWidth={1}
              borderRadius="md"
              padding={4}
              textAlign="center"
              cursor="pointer"
              bg={vehicleType === type ? 'pink.100' : 'white'}
              onClick={() => {
                setVehicleType(type);
                const rideCost = calculateCost(distance, type);
                setCost(rideCost);
              }}
            >
              {type === 'standard' && <FaCar size={30} />}
              {type === 'bike' && <FaMotorcycle size={30} />}
              {type === 'luxury' && <FaTaxi size={30} />}
              <Text fontWeight="bold">{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              <Text>
                Cost: LKR {calculateCost(distance, type)}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
        </HStack>

        <Button colorScheme="teal" mt={4} w="100%" onClick={handleBooking}>
          Book Now
        </Button>
      </Box>
    </Box>
  );
}

export default PassengerDashboard;
