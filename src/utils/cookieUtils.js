import axios from "@axios";
import { toast } from "react-toastify";

export const readCookie = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

export const handleDeleteCookie = (username) => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  axios
    .post("/logout", { USERNAME: username })
    .then((response) => {
      if (response.status === 200) {
        toast.success("You have been logged out.", {
          onClose: () => {
            window.location.href = "/";
          },
          autoClose: 1000,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error:", error.response.data.message);
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error("Error: No response received from server.");
        toast.error("No response from server.");
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred.");
      }
    });
};
