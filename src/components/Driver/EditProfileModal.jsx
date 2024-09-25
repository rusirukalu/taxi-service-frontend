import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProfileModal = ({
  show,
  handleClose,
  editName,
  setEditName,
  editEmail,
  setEditEmail,
  editUsername,
  setEditUsername,
  editNic,
  setEditNic,
  editPhone,
  setEditPhone,
  editAddress,
  setEditAddress,
  handleSaveChanges
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formUsername" className="mt-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formNic" className="mt-3">
            <Form.Label>NIC</Form.Label>
            <Form.Control
              type="text"
              value={editNic}
              onChange={(e) => setEditNic(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={editAddress}
              onChange={(e) => setEditAddress(e.target.value)}
            />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
