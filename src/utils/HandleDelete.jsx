import { toast } from "react-toastify";
import axios from "@axios";

export const HandleDelete = (id, url, bulk = false) => {
  console.log(`${url}/${id}`);

  const confirmDelete = () => {
    axios
      .delete(`${url}/${id}`)
      .then((result) => {
        toast.success("Data deleted successfully!", {
          autoClose: 1000,
          onClose: () => window.location.reload(),
        });
      })
      .catch((err) => {
        toast.error("Failed to delete item.", {
          autoClose: 2000,
        });
      });
  };

  // Only show the confirmation dialog if 'bulk' is true
  if (bulk) {
    toast.info(
      <div>
        <p>Are you sure you want to delete this item?</p>
        <button onClick={confirmDelete} style={{ marginRight: "10px" }}>
          Yes
        </button>
        <button onClick={() => toast.dismiss()}>No</button>
      </div>,
      {
        autoClose: false, // Prevent auto close
        closeButton: false, // Hide the close button
        position: "top-center",
      }
    );
  } else {
    // If bulk is false, directly call the delete action without confirmation
    confirmDelete();
  }
};
