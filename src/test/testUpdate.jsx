import axios from "@axios";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const TestUpdate = () => {
  // State variables to manage form data, input values, and feedback messages
  const [formData, setFormData] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [message, setMessage] = useState("");

  // Extract 'id' from URL params and 'doc' from query parameters
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const doc = params.get("doc");

  useEffect(() => {
    // Fetch data based on 'doc' and 'id' when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`${doc}/${id}`); // API call using 'doc' and 'id'
        setFormData(response.data); // Set fetched data to formData
        setInputValues(response.data); // Initialize form input values
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Failed to load data.");
      }
    };

    fetchData();
  }, [id, doc]); // Re-fetch data if either 'id' or 'doc' changes

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission to update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${doc}/${id}`, inputValues); // API call to update data
      setMessage("Data updated successfully!"); // Success feedback
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      setMessage("Failed to update data."); // Error feedback
    }
  };

  // Function to trigger print dialog
  const printPage = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(
      document.getElementById("printable-content").innerHTML
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // Show loading state until form data is fetched
  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-6 justify-center">
      <div className="w-[60vw]">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src="../logo.jpg" alt="Logo" className="w-[20rem] mb-8" />
        </div>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="rounded-md bg-gray-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
        >
          Back
        </button>

        <div className="text-sm font-semibold text-gray-800 mb-4">
          Update Entry
        </div>

        <hr className="border-gray-300 mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}{" "}
                  {/* Capitalize key */}
                </label>
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={inputValues[key] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${key}`}
                  className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}

        {/* Print Button */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={printPage}
            className="flex justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Print
          </button>
        </div>

        {/* Printable content */}
        <div id="printable-content" style={{ display: "none" }}>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Printable Form Data</h1>
            <div className="mt-4">
              <strong>Document ID: </strong>
              {id}
            </div>
            <div className="mt-2">
              {Object.keys(formData).map((key) => (
                <div key={key}>
                  <strong>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                  </strong>
                  {formData[key]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestUpdate;
