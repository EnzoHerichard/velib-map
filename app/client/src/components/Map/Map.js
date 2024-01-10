import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ markerPosition, popupContent }) => {
  return (
    <MapContainer center={markerPosition} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='<a href="https://umap.openstreetmap.fr/fr/map/carte-velib-paris_983271#12/48.8630/2.3744">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition}>
        <Popup>{popupContent}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
