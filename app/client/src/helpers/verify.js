import { authServUrl } from "../constants/urls";

async function verify(token) {
  try {
    const response = await fetch(`${authServUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    if (response.ok) {
      const { user } = data;
      return { success: true, user };
    } else {
      const { message } = data;
      return { success: false, message };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export default verify;
