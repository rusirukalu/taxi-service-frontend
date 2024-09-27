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


    } catch (error) {
      console.error('Error fetching rides:', error);
    }
  };

  // Update the driver status
  const updateDriverStatus = async (driverId, status) => {
    try {
        await axios.put(`http://localhost:3000/api/v1/driver/update-status/${driverId}`, {
            status: status,
        });
    } catch (error) {
        console.error("Error updating driver status: ", error);
    }
};


  // Handle confirming the ride
  const confirmRide = async (rideId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/driver/rides/${rideId}`, { status: 'in-progress' });
      await updateDriverStatus(rideId, 'busy');
      fetchRides(); // Refresh the list after updating
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  // Handle rejecting the ride
  const rejectRide = async (rideId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/driver/rides/${rideId}`, { status: 'rejected' });
      await updateDriverStatus(rideId, 'available'); // Set driver status to available after rejection
      fetchRides(); // Refresh the list after updating
    } catch (error) {
      console.error('Error rejecting ride:', error);
    }
  };

  // Handle completing the ride
  const completeRide = async (rideId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/driver/rides/${rideId}`, { status: 'completed' });
      await updateDriverStatus(rideId, 'available'); // Set driver status to available after completion
      fetchRides(); // Refresh the list after updating
    } catch (error) {
      console.error('Error completing ride:', error);
    }
  };

  return (
    <div>
      <h2 className="mt-1 mb-4">Rides List</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver Name</th>
            <th>Passenger Passenger</th>
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
              <td>LKR {ride.cost}</td>
              <td>
              <Badge
                  bg={
                    ride.status === 'completed'
                      ? 'info'
                      : ride.status === 'rejected'
                        ? 'danger'
                        : ride.status === 'in-progress'
                          ? 'success'
                          : 'warning'
                  }
                >
                  {ride.status}
                </Badge>
              </td>
              <td>
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => confirmRide(ride.id)}
                  disabled={ride.status !== 'pending'} // Only disable if not pending
                >
                  Confirm
                </Button>
                <Button
                  variant="danger"
                  onClick={() => rejectRide(ride.id)}
                  disabled={ride.status !== 'pending'} // Only disable if not pending
                >
                  Reject
                </Button>
                <Button
                  variant="info"
                  className="me-2"
                  onClick={() => completeRide(ride.id)}
                  disabled={ride.status !== 'in-progress'} // Enable only if status is in-progress
                >
                  Complete
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
