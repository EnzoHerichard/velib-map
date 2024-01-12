import { backUrl } from "../constants/urls";

async function getUserItineraries(id) {
  try {
    const response = await fetch(`${backUrl}/pdf/itineraries/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      const { message } = data;
      return { success: false, message };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export default getUserItineraries;
