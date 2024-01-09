import { authServUrl } from "../../constants/urls";

async function handleLogin({ username, password }) {
  try {
    const response = await fetch(`${authServUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (response.ok) {
      const { token } = data;

      return { success: true, token };
    } else {
      return {
        success: false,
        message: data.message || "Échec de la connexion",
      };
    }
  } catch (error) {
    return { success: false, message: "Erreur lors de la connexion" };
  }
}

export default handleLogin;
