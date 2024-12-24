import axios from "axios";

export const createCookie = (e) => {
  axios
    .get("http://localhost:3000/create-cookie", {
      params: { data: e },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      window.location.href = "../dashboard";
    })
    .catch((error) => {
      console.error(
        "Error creating cookie:",
        error.response?.data || error.message
      );
    });
};

export const readCookie = () => {
  axios
    .get("http://localhost:3000/check-cookie", { withCredentials: true })
    .then((result) => {
      if (result.data.hasCookie) {
        console.log(true);
      } else {
        window.location.href = "../";
      }
    })
    .catch((err) => console.log(err));
};

export const handleDeleteCookie = () => {
  axios
    .get("http://localhost:3000/delete-cookie", { withCredentials: true })
    .then((response) => {
      alert("You have been logged out.");
      window.location.href = "../";
    })
    .catch((error) => {
      console.error(
        "Error deleting cookie:",
        error.response?.data || error.message
      );
      alert("Failed to logout.");
    });
};
