import { backUrl } from "../constants/urls";

const createItinerary = async (itinerary, token) => {
   
  const name = itinerary.name;
  const startPointLng = itinerary.startPointLng;
  const startPointLat = itinerary.startPointLat;
  const endPointLng = itinerary.endPointLng;
  const endPointLat = itinerary.endPointLat;
  const user_id = itinerary.user_id;
  const response = await fetch(`${backUrl}/pdf/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      startPointLng,
      startPointLat,
      endPointLng,
      endPointLat,
      user_id,
      token
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
