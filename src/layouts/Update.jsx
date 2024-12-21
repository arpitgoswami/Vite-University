import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const [design, setDesign] = useState("");
  const [overallStatus, setOverall_Status] = useState("");
  const [invoiceNo, setInvoice_No] = useState("");
  const [invoiceDate, setInvoice_Date] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/order_sheets/${id}`)
        .then((result) => {
          console.log("Fetched data:", result.data);
          setDesign(result.data.design || ""); // Default to empty string
          setOverall_Status(result.data.overall_status || "");
          setInvoice_No(result.data.invoice_no || "");
          setInvoice_Date(result.data.invoice_date || "");
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
        });
    } else {
      console.error("No ID provided");
    }
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/order_sheets/${id}`, {
        design: design,
        overall_status: overallStatus,
        invoice_no: invoiceNo,
        invoice_date: invoiceDate,
      })
      .then((result) => {
        console.log("User updated successfully:", result.data);
        console.log(overallStatus);
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-sm font-semibold text-gray-800 mb-4">
        Update Entry
      </div>
      <hr className="border-gray-300 mb-4" />
      <form onSubmit={Update} className="grid grid-cols-2 gap-y-4 gap-x-6">
        {/* Design Input */}
        <div>
          <label
            htmlFor="design"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Design
          </label>
          <input
            type="text"
            id="design"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
            placeholder="Enter design"
            className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
            required
          />
        </div>

        {/* Overall Status Input (Dropdown) */}
        <div>
          <label
            htmlFor="overallStatus"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Overall Status
          </label>
          <select
            id="overallStatus"
            value={overallStatus}
            onChange={(e) => setOverall_Status(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
            required
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="New">New</option>
          </select>
        </div>

        {/* Invoice Number Input */}
        <div>
          <label
            htmlFor="invoiceNo"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Invoice Number
          </label>
          <input
            type="text"
            id="invoiceNo"
            value={invoiceNo}
            onChange={(e) => setInvoice_No(e.target.value)}
            placeholder="Enter invoice number"
            className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
            required
          />
        </div>

        {/* Invoice Date Input */}
        <div>
          <label
            htmlFor="invoiceDate"
            className="block text-sm font-medium text-gray-800 mb-1"
          >
            Invoice Date
          </label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceDate}
            onChange={(e) => setInvoice_Date(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-800 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 rounded-md bg-indigo-600 text-white text-sm font-semibold shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
