import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
  Select,
  VStack,
} from '@chakra-ui/react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../../components/Navbar';

const center = { lat: 48.8584, lng: 2.2945 };

function RideBooking() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.AIzaSyApHYUH5MfQaCitqMVVbp58DkPYExV6Iw8,
    libraries: ['places'],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState(0);
  const [selectedVehicle, setSelectedVehicle] = useState('economy');

  // Prices per kilometer for different vehicle types
  const vehiclePrices = {
    economy: 1.5,  // Example: $1.5 per km
    premium: 2.5,  // Example: $2.5 per km
    suv: 3.5,      // Example: $3.5 per km
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return <SkeletonText />;
  }

  // Calculate route and price
  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }

    /* global google */
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    const distanceInKm = parseFloat(results.routes[0].legs[0].distance.text.replace(' km', ''));
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    // Calculate price based on distance and selected vehicle
    const calculatedPrice = distanceInKm * vehiclePrices[selectedVehicle];
    setPrice(calculatedPrice.toFixed(2)); // Round to 2 decimal places
  }

  // Clear route and input fields
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setPrice(0);
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <Flex
      position="relative"
      flexDirection="column"
      alignItems="center"
      h="100vh"
      w="100vw"
    >
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <VStack spacing={4} alignItems="stretch">
          <HStack spacing={2} justifyContent="space-between">
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type="text" placeholder="Origin" ref={originRef} />
              </Autocomplete>
            </Box>
            <Box flexGrow={1}>
              <Autocomplete>
                <Input type="text" placeholder="Destination" ref={destinationRef} />
              </Autocomplete>
            </Box>

            <ButtonGroup>
              <Button colorScheme="green" type="submit" onClick={calculateRoute}>
                Calculate Route
              </Button>
              <IconButton
                aria-label="clear route"
                icon={<FaTimes />}
                onClick={clearRoute}
              />
            </ButtonGroup>
          </HStack>

          {/* Vehicle and Price Section */}
          <HStack spacing={4} justifyContent="space-between">
            <Select
              placeholder="Select vehicle"
              onChange={(e) => setSelectedVehicle(e.target.value)}
              value={selectedVehicle}
            >
              <option value="economy">Economy</option>
              <option value="premium">Premium</option>
              <option value="suv">SUV</option>
            </Select>
            <Text>Distance: {distance}</Text>
            <Text>Duration: {duration}</Text>
            <Text>Total Price: ${price}</Text>
          </HStack>

          <HStack spacing={4} mt={4} justifyContent="space-between">
            <IconButton
              aria-label="center map"
              icon={<FaLocationArrow />}
              isRound
              size="sm" // Make the location button small
              onClick={() => {
                // Check if geolocation is available in the browser
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const { latitude, longitude } = position.coords;

                      // Pan the map to the user's live location and set zoom level
                      map.panTo({ lat: latitude, lng: longitude });
                      map.setZoom(15);
                    },
                    (error) => {
                      console.error("Error getting location:", error);
                      alert("Unable to retrieve your location. Please enable location services.");
                    }
                  );
                } else {
                  alert("Geolocation is not supported by your browser.");
                }
              }}
            />
            
            <Button 
              colorScheme="blue" 
              size="sm" // Make the back button small
              onClick={() => navigate('/CallOperatorDashboard')}
            >
              Back to Dashboard
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}

export default RideBooking;