import { backUrl } from "../constants/urls";

async function handleUpdateUser(username, id) {
  
  try {
    const response = await fetch(`${backUrl}/auth/updateUsername/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newUsername: username}),
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

export default handleUpdateUser;
