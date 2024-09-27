import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import axios from 'axios';

function RidesTable() {
  const [rides, setRides] = useState([]);

  // Fetch the rides data from the backend API
  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/driver/ride-details'); // Adjust API endpoint
      setRides(response.data.message);
      console.log(response.data.message)
      console.log()
    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  // Handle confirming the ride
  const confirmRide = async (rideId) => {
    try {
      await axios.put(`/api/rides/${rideId}`, { status: 'confirmed' });
      fetchRides(); // Refresh the list after updating
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  // Handle rejecting the ride
  const rejectRide = async (rideId) => {
    try {
      await axios.put(`/api/rides/${rideId}`, { status: 'rejected' });
      fetchRides(); // Refresh the list after updating
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  };

  return (
    <div>
      <h2 className="mt-1 mb-4">Rides List</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver ID</th>
            <th>Passenger ID</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Duration</th>
            <th>Distance</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id}>
              <td>{ride.id}</td>
              <td>{ride.driver.fullName || 'N/A'}</td>
              <td>{ride.passenger.fullName}</td>
              <td>{ride.pickupLocation}</td>
              <td>{ride.dropLocation}</td>
              <td>{ride.duration}</td>
              <td>{ride.distance}</td>
              <td>{ride.cost}</td>
              <td>
                <Badge bg={ride.status === 'confirmed' ? 'success' : ride.status === 'rejected' ? 'danger' : 'warning'}>
                  {ride.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => confirmRide(ride.id)}
                  disabled={ride.status !== 'pending'}
                >
                  Confirm
                </Button>
                <Button
                  variant="danger"
                  onClick={() => rejectRide(ride.id)}
                  disabled={ride.status !== 'pending'}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default RidesTable;
