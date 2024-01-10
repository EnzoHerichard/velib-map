import { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Polyline
} from "react-leaflet";
import localisation from "./location.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import "./styles.css";
import "leaflet/dist/leaflet.css";

const Itinerary = () => {
  const [velibData, setVelibData] = useState([]);
  const [clickedPosition, setClickedPosition] = useState({
    start: null,
    end: null,
  });
  const [nearestStartStation, setNearestStartStation] = useState(null);
  const [nearestEndStation, setNearestEndStation] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [route, setRoute] = useState([]);

  useEffect(() => {
    const fetchVelibData = async () => {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=100"
        );
        const data = await response.json();
        setVelibData(data.results);
      } catch (error) {
        console.error("Error fetching Velib data:", error);
      }
    };

    fetchVelibData();
  }, []);

  const customIcon = new Icon({
    iconUrl: localisation,
    iconSize: [25, 25],
  });

  const startIcon = new Icon({
    iconUrl: "https://www.svgrepo.com/show/399405/flag-start-b-o.svg",
    iconSize: [25, 25],
  });

  const endIcon = new Icon({
    iconUrl: "https://www.svgrepo.com/show/399402/flag-finish-b-o.svg",
    iconSize: [25, 25],
  });

  const ClickHandler = () => {
    const map = useMapEvent("click", (e) => {
      if (clickCount === 0) {
        setClickedPosition({ start: e.latlng, end: null });
        setClickCount(1);
      } else if (clickCount === 1) {
        setClickedPosition({ start: clickedPosition.start, end: e.latlng });
        setClickCount(2);
      } else {
        setClickedPosition({ start: e.latlng, end: null });
        setClickCount(1);
      }
    });
    return null;
  };

  const findNearestStation = (position, isStart) => {
    if (position && velibData.length > 0) {
      let minDistance = Infinity;
      let closestStation = null;

      velibData.forEach((record) => {
        const distance = Math.sqrt(
          Math.pow(position.lat - record.coordonnees_geo.lat, 2) +
            Math.pow(position.lng - record.coordonnees_geo.lon, 2)
        );

        if (isStart) {
          if (distance < minDistance && record.numbikesavailable > 0) {
            minDistance = distance;
            closestStation = record;
          }
        } else {
          if (distance < minDistance) {
            minDistance = distance;
            closestStation = record;
          }
        }
      });

      return closestStation;
    }
    return null;
  };

  useEffect(() => {
    setNearestStartStation(findNearestStation(clickedPosition.start, true));
    setNearestEndStation(findNearestStation(clickedPosition.end, false));
  }, [clickedPosition, velibData]);

  const fetchRoute = async (
    startLng,
    startLat,
    nearestStartStationLng,
    nearestStartStationLat,
    nearestEndStationLng,
    nearestEndStationLat,
    endLng,
    endLat
  ) => {
    const osrmBaseUrl = "https://router.project-osrm.org/route/v1";
    const url = `${osrmBaseUrl}/bike/${startLng},${startLat};${nearestStartStationLng},${nearestStartStationLat};${nearestEndStationLng},${nearestEndStationLat};${endLng},${endLat}?overview=full&geometries=geojson`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      // Check if the response has a route
      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0].geometry.coordinates;

        // Convert the route data to the format expected by Polyline
        const formattedRoute = routeData.map((coord) => {
            return [coord[1], coord[0]]; // Transforming the coordinate format
        });
        setRoute(formattedRoute);
      } else {
        console.error("No route found.");
        setRoute([]); // Set an empty route to clear any existing route
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setRoute([]); // Set an empty route in case of an error
    }
  };

  useEffect(() => {
    if (
      clickedPosition.start &&
      clickedPosition.end &&
      nearestStartStation &&
      nearestEndStation
    ) {
      fetchRoute(
        clickedPosition.start.lng,
        clickedPosition.start.lat,
        nearestStartStation.coordonnees_geo.lon,
        nearestStartStation.coordonnees_geo.lat,
        nearestEndStation.coordonnees_geo.lon,
        nearestEndStation.coordonnees_geo.lat,
        clickedPosition.end.lng,
        clickedPosition.end.lat
      );
    }
  }, [clickedPosition, nearestStartStation, nearestEndStation]);

  return (
    <div>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Display the route polyline */}
        {route.length > 0 && (
          <Polyline positions={route} color="blue" />
        )}

        {clickedPosition.start && (
          <Marker position={clickedPosition.start} icon={startIcon}>
            <Popup>
              <strong>Position de départ</strong>
              <br />
              C'est ici que vous voulez commencer votre trajet
            </Popup>
          </Marker>
        )}
        {clickedPosition.end && (
          <Marker position={clickedPosition.end} icon={endIcon}>
            <Popup>
              <strong>Position d'arrivée</strong>
              <br />
              C'est ici que vous voulez terminer votre trajet
            </Popup>
          </Marker>
        )}
        <MarkerClusterGroup>
          {velibData &&
            velibData.map((record) => (
              <Marker
                key={record.stationcode}
                position={[
                  record.coordonnees_geo.lat,
                  record.coordonnees_geo.lon,
                ]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{record.name}</strong>
                  <br />
                  Available Bikes: {record.numbikesavailable}
                  <br />
                  Available Stands: {record.numdocksavailable}
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
        <ClickHandler />
      </MapContainer>
      {nearestStartStation && clickCount !== 0 && (
        <div>
          <h3>Station Vélib' la plus proche du départ :</h3>
          <p>Nom : {nearestStartStation.name}</p>
        </div>
      )}
      {nearestEndStation && clickCount === 2 && (
        <div>
          <h3>Station Vélib' la plus proche de l'arrivée :</h3>
          <p>Nom : {nearestEndStation.name}</p>
        </div>
      )}
    </div>
  );
};

export default Itinerary;
