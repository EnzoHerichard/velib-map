import { Icon } from "leaflet";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  Polyline,
} from "react-leaflet";
import localisation from "./location.svg";
import MarkerClusterGroup from "react-leaflet-cluster";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import BackToHome from "../../components/BackHome";
import createItinerary from "../../helpers/createItinerary";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";

const PDFDocument = ({ startStation, endStation, startStreet, endStreet, distance, duration }) => (
  <Document>
    <Page>
      <Text>
        Itinéraire Vélib'
        {"\n"}
        Durée du trajet : {duration} minutes
        {"\n"}
        Distance à parcourir : {distance} kilomètres
        {"\n"}
        Position de départ : {startStreet}
        {"\n"}
        Dirigez vous vers la station : {startStation?.name}
        {"\n"}
        Prenez un vélo et dirigez vous vers la station : {endStation?.name}
        {"\n"}
        Dirigez vous vers votre destination : {endStreet}
      </Text>
    </Page>
  </Document>
);

const Itinerary = () => {
  const [velibData, setVelibData] = useState([]);
  const [clickedPosition, setClickedPosition] = useState({
    start: null,
    end: null,
  });
  const [startStreet, setStartStreet] = useState(null);
  const [endStreet, setEndStreet] = useState(null);
  const [nearestStartStation, setNearestStartStation] = useState(null);
  const [nearestEndStation, setNearestEndStation] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [route, setRoute] = useState([]);
  const [token, setToken] = useState(Cookies.get("authToken"));

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
          if (distance < minDistance && record.numdocksavailable > 0) {
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
      console.log(data);
      if (data.routes && data.routes.length > 0) {
        const routeData = data.routes[0].geometry.coordinates;
        setStartStreet(data.waypoints[0].name);
        setEndStreet(data.waypoints[3].name);
        const distance = (data.routes[0].distance / 1000).toFixed(2);
        setDistance(distance);
        const duration = (data.routes[0].duration / 60).toFixed(0);
        setDuration(duration);


        const formattedRoute = routeData.map((coord) => {
          return [coord[1], coord[0]];
        });
        setRoute(formattedRoute);
      } else {
        console.error("No route found.");
        setRoute([]);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      setRoute([]);
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

  const handleItineraryForm = async () => {
    const dataUser = await verify(token);
    const id = dataUser.user.id;
    const name = startStreet + " - " + endStreet;
    const itinerary = {
      name: name,
      startPointLng: clickedPosition.start.lng,
      startPointLat: clickedPosition.start.lat,
      nearestStartStationPointLng: nearestStartStation.coordonnees_geo.lon,
      nearestStartStationPointLat: nearestStartStation.coordonnees_geo.lat,
      nearestEndStationPointLng: nearestEndStation.coordonnees_geo.lon,
      nearestEndStationPointLat: nearestEndStation.coordonnees_geo.lat,
      endPointLng: clickedPosition.end.lng,
      endPointLat: clickedPosition.end.lat,
      user_id: id,
    };
    const response = await createItinerary(itinerary);
    console.log(response);
  };
  return (
    <div>
      <BackToHome />
      <h1>Itinéraire Vélib'</h1>
      <MapContainer center={[48.8566, 2.3522]} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {route.length > 0 && <Polyline positions={route} color="blue" />}

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
                  Vélos disponibles: {record.numbikesavailable}
                  <br />
                  Station disponibles: {record.numdocksavailable}
                </Popup>
              </Marker>
            ))}
        </MarkerClusterGroup>
        <ClickHandler />
      </MapContainer>
      {nearestEndStation && clickCount === 2 && (
        <div>
          <button onClick={handleItineraryForm}>Enregistrer l'itineraire</button>
        </div>
      )}
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
      {distance && (
        <div>
          <h3>Distance totale du trajet :</h3>
          <p>{distance} kilomètres</p>
        </div>
      )}
      {duration && (
        <div>
          <h3>Durée totale du trajet :</h3>
          <p>{duration} minutes</p>
        </div>
      )}

      <PDFDownloadLink
        document={
          <PDFDocument
            startStation={nearestStartStation}
            endStation={nearestEndStation}
            startStreet={startStreet}
            endStreet={endStreet}
            distance={distance}
            duration={duration}
          />
        }
        fileName="itineraire.pdf"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Chargement du PDF..." : "Télécharger le PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Itinerary;
