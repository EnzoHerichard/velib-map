import React, { useState, useEffect } from "react";
import getUserItineraries from "../../helpers/getUserItineraries";
import Cookies from "js-cookie";
import verify from "../../helpers/verify";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";

const PDFDocument = ({
  startStation,
  endStation,
  startStreet,
  endStreet,
  distance,
  duration,
}) => (
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

const SaveItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [token, setToken] = useState(Cookies.get("authToken"));
  const [startStreet, setStartStreet] = useState(null);
  const [endStreet, setEndStreet] = useState(null);
  const [nearestStartStation, setNearestStartStation] = useState(null);
  const [nearestEndStation, setNearestEndStation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [routesFetched, setRoutesFetched] = useState([]);

  const fetchItineraries = async () => {
    try {
      const dataUser = await verify(token);
      const id = dataUser.user.id;
      const getItineraries = await getUserItineraries(id);
      if (getItineraries && getItineraries.data) {
        const fetchedItineraries = getItineraries.data;
        setItineraries(fetchedItineraries);
      } else {
        console.error("Unable to get itineraries");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, []);

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
      if (data.routes && data.routes.length > 0) {
        setStartStreet(data.waypoints[0].name);
        setEndStreet(data.waypoints[3].name);
        const distance = (data.routes[0].distance / 1000).toFixed(2);
        setDistance(distance);
        const duration = (data.routes[0].duration / 60).toFixed(0);
        setDuration(duration);
        setNearestStartStation(data.waypoints[1].name);
        setNearestEndStation(data.waypoints[2].name);
      } else {
        console.error("No route found.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  useEffect(() => {
    if (itineraries !== null) {
      const promises = itineraries.map((itinerary) =>
        fetchRoute(
          itinerary.startPointLng,
          itinerary.startPointLat,
          itinerary.nearestStartStationPointLng,
          itinerary.nearestStartStationPointLat,
          itinerary.nearestEndStationPointLng,
          itinerary.nearestEndStationPointLat,
          itinerary.endPointLng,
          itinerary.endPointLat
        )
      );

      Promise.all(promises).then(() => {
        setRoutesFetched(true);
      });
    }
  }, [itineraries]);

  return (
    <div>
      <h1>Mes itineraires</h1>
      <ul>
        {itineraries.map((itinerary) => (
          <div>
            <li key={itinerary.id}>
              <p>{itinerary.name}</p>
              <p>{itinerary.created_date}</p>
              <p>Départ : {startStreet}</p>
              <p>{nearestStartStation}</p>
              <p>{nearestEndStation}</p>
              <p>Arrivé : {endStreet}</p>
              <p>{distance} kilomètre</p>
              <p>{duration} minutes</p>
            </li>
            {nearestEndStation &&
              nearestStartStation &&
              startStreet &&
              endStreet &&
              distance &&
              duration &&
              routesFetched && ( // Render PDFDownloadLink conditionally
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
              )}
          </div>
        ))}
      </ul>
      {/* Add loading spinner or placeholder UI if needed */}
    </div>
  );
};

export default SaveItinerary;
