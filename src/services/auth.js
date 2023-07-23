import axios from "axios";

const server_domain = "http://localhost:80";

export async function registerUser(registerDetails) {
  try {
    const response = await axios.post(
      server_domain + '/Register',
      registerDetails,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(loginDetails) {
  try {
    const response = await axios.post(
      server_domain + '/Login',
      loginDetails,
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function logoutUser() {
  try {
    const response = await axios.post(
      server_domain + '/Logout',
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}