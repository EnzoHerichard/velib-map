import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BackToHome from "../../components/BackHome";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const StationsContainer = styled.div`
  margin: 0px;
`;

const StationsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  background-color: #f2f2f2;
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const Stations = () => {
  const [velibData, setVelibData] = useState([]);
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/"); 
      return;
    }
  }, [authenticated, navigate]);
  useEffect(() => {
    const fetchVelibData = async () => {
      try {
        const response = await fetch(
          "https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records?limit=100"
        );
        const data = await response.json();
        const sortedData = data.results.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setVelibData(sortedData);
      } catch (error) {
        console.error("Error fetching Velib data:", error);
      }
    };

    fetchVelibData();
  }, []);

  return (
    <StationsContainer>
     <BackToHome />
      <h1>Stations Vélib'</h1>
      <StationsTable>
        <thead>
          <tr>
            <TableHeader>Nom de la station</TableHeader>
            <TableHeader>Vélos disponibles</TableHeader>
            <TableHeader>Bornes disponibles</TableHeader>
          </tr>
        </thead>
        <tbody>
          {velibData.map((station) => (
            <tr key={station.recordid}>
              <TableCell>{station.name}</TableCell>
              <TableCell>{station.numbikesavailable}</TableCell>
              <TableCell>{station.numdocksavailable}</TableCell>
            </tr>
          ))}
        </tbody>
      </StationsTable>
    </StationsContainer>
  );
};

export default Stations;
