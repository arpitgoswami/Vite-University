import axios from "@axios";
import { toast } from "react-toastify";

export function filterData(data, searchQuery, columns) {
  if (!searchQuery) return data;

  return data.filter((item) =>
    columns.some((column) =>
      item[column]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}

export async function fetchData(url, setData, setLoading) {
  setLoading(true);
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
}

export const handleDelete = (id, url) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this item?"
  );

  if (!isConfirmed) {
    return;
  }

  axios
    .delete(`${url}/${id}`)
    .then((result) => {
      toast.success("Data updated successfully!", {
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
