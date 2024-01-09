import { authServUrl } from "../constants/urls";

async function verify(token) {
    console.log(token);
  try {
    const response = await fetch(`${authServUrl}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({token}),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export default verify;
