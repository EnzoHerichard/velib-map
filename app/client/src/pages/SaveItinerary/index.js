import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import styled from "styled-components";
import Cookies from "js-cookie";
import BackToHome from "../../components/BackHome";
import getUserItineraries from "../../helpers/getUserItineraries";
import verify from "../../helpers/verify";

const Container = styled.div`
  padding: 20px;
`;

const Table = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TableRow = styled.li`
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const TableData = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const DownloadButton = styled.button`
  background-color: #c2eabd;
  align-self: center;
  max-height: 40px;
  color: black;
  padding: 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4062bb;
    color: #ffffff;
  }
`;

const SaveItinerary = () => {
  const [velibData, setVelibData] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const osrmBaseUrl = "https://router.project-osrm.org/route/v1";

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

  const getStreetsName = async (
    startPointLnt,
    startPointLat,
    endPointLnt,
    endPointLat
  ) => {
    const url = `${osrmBaseUrl}/bike/${startPointLnt},${startPointLat};${endPointLnt},${endPointLat}?overview=false`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const startStreet = data.waypoints[0].name;
      const endStreet = data.waypoints[1].name;
      return { startStreet, endStreet };
    }
  };

  const getItineraries = async () => {
    const token = Cookies.get("authToken");
    const user_id = await verify(token);
    const itineraries = await getUserItineraries(user_id.user.id);
    setItineraries(itineraries.data);
  };

  useEffect(() => {
    getItineraries();
  }, []);

  const findNearestStation = (lat, lng, isStart) => {
    if (velibData.length > 0) {
      let minDistance = Infinity;
      let closestStation = null;

      velibData.forEach((record) => {
        const distance = Math.sqrt(
          Math.pow(lat - record.coordonnees_geo.lat, 2) +
            Math.pow(lng - record.coordonnees_geo.lon, 2)
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

  const getItinerary = async (
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
        const distance = (data.routes[0].distance / 1000).toFixed(2);
        const duration = (data.routes[0].duration / 60).toFixed(0);
        return { distance, duration };
      } else {
        console.error("No route found.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };
  const handlePDF = async (index) => {
    const { startStreet, endStreet } = await getStreetsName(
      itineraries[index].startPointLng,
      itineraries[index].startPointLat,
      itineraries[index].endPointLng,
      itineraries[index].endPointLat
    );
    const startStation = findNearestStation(
      itineraries[index].startPointLat,
      itineraries[index].startPointLng,
      true
    );
    const endStation = findNearestStation(
      itineraries[index].endPointLat,
      itineraries[index].endPointLng,
      false
    );

    const startStationName = startStation ? startStation.name : "Aucune";
    const endStationName = endStation ? endStation.name : "Aucune";
    const { distance, duration } = await getItinerary(
      itineraries[index].startPointLng,
      itineraries[index].startPointLat,
      startStation.coordonnees_geo.lon,
      startStation.coordonnees_geo.lat,
      endStation.coordonnees_geo.lon,
      endStation.coordonnees_geo.lat,
      itineraries[index].endPointLng,
      itineraries[index].endPointLat
    );
    const doc = new jsPDF();
    doc.text(`Itinéraire Vélib'`, 10, 10);
    doc.text(`Durée du trajet : ${duration} minutes`, 10, 20);
    doc.text(`Distance à parcourir : ${distance} kilomètres`, 10, 30);
    doc.text(`Départ : ${startStreet}`, 10, 40);
    doc.text(`Station de départ : ${startStationName}`, 10, 60);
    doc.text(`Station d'arrivée : ${endStationName}`, 10, 70);
    doc.text(`Arrivée : ${endStreet}`, 10, 50);
    doc.save("itineraire.pdf");
  };
  return (
    <Container>
      <BackToHome />
      <Table>
        {itineraries.map((itinerary, index) => (
          <TableRow key={itinerary.id}>
            <TableData>
              <p>{itinerary.name}</p>
              <p>{itinerary.created_date}</p>
            </TableData>
            <DownloadButton onClick={() => handlePDF(index)}>
              Télécharger
            </DownloadButton>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
};

export default SaveItinerary;
