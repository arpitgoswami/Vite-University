import axios from "@axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TestUpdate = () => {
  const [formData, setFormData] = useState(null);
  const [inputValues, setInputValues] = useState({});

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const doc = params.get("doc");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${doc}/${id}`);
        setFormData(response.data);
        setInputValues(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, [id, doc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${doc}/${id}`, inputValues);
      toast.success("Data updated successfully!", {
        autoClose: 1000,
        onClose: () => navigate(-1),
      });
      console.log("Updated data:", response.data);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.error("Failed to update data.", {
        autoClose: 2000,
      });
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-6 justify-center">
      <div className="w-[60vw]">
        <div className="flex justify-center mb-6">
          <img src="../logo.jpg" alt="Logo" className="w-[20rem] mb-8" />
        </div>

        <div className="text-sm font-semibold text-gray-800 mb-4">
          Update Entry
        </div>

        <hr className="border-gray-300 mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(formData).map(
              (key) =>
                key !== "_id" && (
                  <div key={key}>
                    <label
                      htmlFor={key}
                      className="block text-sm font-medium text-gray-900"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                    {key.toLowerCase().includes("date") ? (
                      <input
                        type="date"
                        id={key}
                        name={key}
                        value={inputValues[key] || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      />
                    ) : (
                      <input
                        type="text"
                        id={key}
                        name={key}
                        value={inputValues[key] || ""}
                        onChange={handleChange}
                        placeholder={`Enter ${key}`}
                        className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      />
                    )}
                  </div>
                )
            )}
          </div>

          <div className="mt-6 flex justify-between items-center space-x-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center rounded-md bg-gray-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              <svg
                className="w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Back
            </button>

            <button
              type="submit"
              className="flex justify-center items-center rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TestUpdate;
