import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet's default marker icon not displaying issue
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const MapComponent = () => {
  // Galle, Sri Lanka Coordinates
  const gallePosition = [6.0328, 80.2164]; 

  return (
    <MapContainer center={gallePosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={gallePosition}>
        <Popup>
          Galle, Sri Lanka
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
