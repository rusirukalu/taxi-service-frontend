import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ManagePassengerDetails.css'; // Import the CSS file

const ManagePassengerDetails = () => {
  const [passengers, setPassengers] = useState([]);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    // Fetch passenger data (mock or real API call)
    const fetchPassengers = async () => {
      // Mock data for now
      const data = [
        { id: 1, name: 'John Doe', contact: '123-456-7890', address: '123 Main St' },
        { id: 2, name: 'Jane Smith', contact: '987-654-3210', address: '456 Oak St' },
      ];

      setPassengers(data);
    };

    fetchPassengers();
  }, []);

  return (
    <div className="manage-passenger-container">
      <h2>Manage Passenger Details</h2>

      {/* Back Button */}
      <button className="back-btn" onClick={() => navigate('/CallOperatorDashboard')}>
        Back to Dashboard
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.id}>
              <td>{passenger.id}</td>
              <td>{passenger.name}</td>
              <td>{passenger.contact}</td>
              <td>{passenger.address}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(passenger.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(passenger.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const handleEdit = (id) => {
    console.log('Edit passenger with ID:', id);
    // Add your logic for editing passenger
  };

  const handleDelete = (id) => {
    console.log('Delete passenger with ID:', id);
    // Add your logic for deleting passenger
  };
};

export default ManagePassengerDetails;