import axios from "@axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TestCreate = () => {
  const { doc } = useParams(); // Get the 'doc' from route params
  const [inputValues, setInputValues] = useState({});
  const [message, setMessage] = useState(""); // Feedback message
  const [fields, setFields] = useState([]); // To store the field names
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch field names (labels) from the API when the component mounts
  useEffect(() => {
    const fetchFields = async () => {
      try {
        // Fetch a sample record or schema to get the fields
        const response = await axios.get(`${doc}`); // Replace with actual endpoint to get a sample or schema
        if (response.data && response.data.length > 0) {
          const firstRecord = response.data[0]; // Get the first record if the response is an array
          setFields(Object.keys(firstRecord)); // Extract field names from the first record
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching fields:", error);
        setMessage("Failed to load fields.");
        setLoading(false);
      }
    };

    fetchFields();
  }, [doc]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission to create new data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to create new entry using the dynamic doc endpoint
      const response = await axios.post(`${doc}`, inputValues);
      setMessage("Data created successfully!"); // Success feedback
      console.log("Created data:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
      setMessage("Failed to create data."); // Error feedback
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state while fetching field data
  }

  return (
    <div className="flex p-6 justify-center">
      <div className="w-[60vw]">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src="../logo.jpg" alt="Logo" className="w-[20rem] mb-8" />
        </div>

        <div className="text-sm font-semibold text-gray-800 mb-4">
          Create New Entry
        </div>

        <hr className="border-gray-300 mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Dynamically generate form fields based on the fetched field names */}
            {fields.map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                  {/* Capitalize the first letter of the field */}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={inputValues[field] || ""}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
                  // Disable _id field
                  disabled={field === "_id"}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-6 flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-green-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TestCreate;
