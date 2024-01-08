import { authServUrl } from "../../constants/urls";

async function handleRegister({ username, password }) {
  try {
    const response = await fetch(`${authServUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
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
    console.log(error);
    return { success: false, message: error.message };
  }
}

export default handleRegister;
