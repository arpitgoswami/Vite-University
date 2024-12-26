import axios from "@axios";
import { toast } from "react-toastify";

export const createCookie = (e) => {
  axios
    .get("create-cookie", {
      params: { data: e },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response.data);
      toast.success("Login successful!", {
        onClose: () => {
          window.location.href = "../dashboard";
        },
        autoClose: 1000, // Close after 1 second for successful login
      });
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
    .get("check-cookie", { withCredentials: true })
    .then((result) => {
      if (result.data.hasCookie) {
        console.log(true);
      } else {
        console.log(false);
      }
    })
    .catch((err) => console.log(err));
};

export const handleDeleteCookie = () => {
  axios
    .get("delete-cookie", { withCredentials: true })
    .then((response) => {
      toast.success("You have been logged out.", {
        onClose: () => {
          window.location.href = "/"; // Navigate to the home page
        },
        autoClose: 1000,
      });
    })
    .catch((error) => {
      console.error(
        "Error deleting cookie:",
        error.response?.data || error.message
      );
      toast.error("Failed to logout. Please try again.", {
        autoClose: 3000,
      });
    });
};
