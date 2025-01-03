import axios from "@axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const TestCreate = () => {
  const { doc } = useParams();
  const [inputValues, setInputValues] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get(`${doc}`);
        if (response.data && response.data.length > 0) {
          const firstRecord = response.data[0];
          setFields(Object.keys(firstRecord));
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching fields:", error);
        setLoading(false);
      }
    };

    fetchFields();
  }, [doc]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${doc}`, inputValues);
      toast.success("Data created successfully!", {
        autoClose: 1000,
        onClose: () => navigate(-1),
      });
      console.log("Created data:", response.data);
    } catch (error) {
      console.error("Error creating data:", error);
      toast.error("Failed to create data.", {
        autoClose: 2000,
      });
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex p-6 justify-center">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <div className="flex justify-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="w-[20rem] mb-8" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create New Entry
        </h2>

        <hr className="border-gray-300 mb-4" />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {fields.map(
              (field) =>
                field !== "_id" && (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium text-gray-900"
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field.toLowerCase().includes("date") ? (
                      <input
                        type="date"
                        id={field}
                        name={field}
                        value={inputValues[field] || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      />
                    ) : (
                      <input
                        type="text"
                        id={field}
                        name={field}
                        value={inputValues[field] || ""}
                        onChange={handleChange}
                        placeholder={`Enter ${field}`}
                        className="mt-1 block w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-800 outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-600"
                      />
                    )}
                  </div>
                )
            )}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center justify-center rounded-md bg-gray-600 px-5 py-2 text-sm font-semibold text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
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
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TestCreate;
