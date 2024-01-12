import { pdfServUrl } from "../constants/urls";

const createItinerary = async (itinerary) => {
   
  const name = itinerary.name;
  const startPointLng = itinerary.startPointLng;
  const startPointLat = itinerary.startPointLat;
  const nearestStartStationPointLng = itinerary.nearestStartStationPointLng;
  const nearestStartStationPointLat = itinerary.nearestStartStationPointLat;
  const nearestEndStationPointLng = itinerary.nearestEndStationPointLng;
  const nearestEndStationPointLat = itinerary.nearestEndStationPointLat;
  const endPointLng = itinerary.endPointLng;
  const endPointLat = itinerary.endPointLat;
  const user_id = itinerary.user_id;
  const response = await fetch(`${pdfServUrl}/itinerary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      startPointLng,
      startPointLat,
      nearestStartStationPointLng,
      nearestStartStationPointLat,
      nearestEndStationPointLng,
      nearestEndStationPointLat,
      endPointLng,
      endPointLat,
      user_id,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    const { message } = data;
    return { success: true, message };
  } else {
    const { message } = data;
    return { success: false, message };
  }
};

export default createItinerary;
