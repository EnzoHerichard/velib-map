import { backUrl } from "../constants/urls";

async function handleLogout(username) {
  try {
    const response = await fetch(`${backUrl}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username}),
    });
    const data = await response.json();

    if (response.ok) {
      const { message } = data;
      return { success: true, message };
    } else {
      const { message } = data;
      return { success: false, message };
    }
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}

export default handleLogout;
