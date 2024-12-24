import axios from "@axios";

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
  axios
    .delete(`${url}/${id}`)
    .then((result) => {
      console.log("Deleted successfully:", result);
    })
    .catch((err) => {
      console.error("Error deleting:", err);
    });
};
