import axios from "@axios";
import { toast } from "react-toastify";

export function createCookie(token) {
  document.cookie = `authToken=${token};`;
  toast.success("Login successful!", {
    onClose: () => {
      window.location.href = "../dashboard";
    },
    autoClose: 1000,
  });
}

export const handleDeleteCookie = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  toast.success("You have been logged out.", {
    onClose: () => {
      window.location.href = "/";
    },
    autoClose: 1000,
  });
};
