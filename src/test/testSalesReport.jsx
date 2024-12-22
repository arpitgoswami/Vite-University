import { useEffect, useState } from "react";
import axios from "axios";

function TestSalesReport() {
  const [salesData, setSalesData] = useState([]);
  const [reload, setReload] = useState();
  const [id, setId] = useState();
  const [searchData, setSearchData] = useState();

  const [formData, setFormData] = useState({
    design: "",
    overall_status: "New",
    invoice_no: "",
    invoice_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/order_sheets")
      .then((result) => setSalesData(result.data))
      .catch((err) => console.log(err));
    setReload(0);
  }, [reload]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/order_sheets/${id}`)
      .then((result) => {
        console.log("Deleted successfully:", result);
      })
      .catch((err) => {
        console.error("Error deleting:", err);
      });
    setReload(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/order_sheets/", formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
    setReload(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:3000/order_sheets/${id}`)
      .then((result) => {
        const data = Array.isArray(result.data) ? result.data : [result.data];
        setSearchData(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-6">
      <div className="text-sm/6 font-semibold">Add New Entry</div>
      <hr className="my-2" />
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-y-2 gap-x-4"
      >
        <div>
          <label
            htmlFor="design"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Design
          </label>
          <input
            type="text"
            id="design"
            name="design"
            value={formData.design}
            onChange={handleChange}
            placeholder="Enter design"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="overall_status"
            className="block text-sm font-medium text-gray-900"
          >
            Overall Status
          </label>
          <select
            id="overall_status"
            name="overall_status"
            onChange={handleChange}
            className="mt-3 h-[2.2rem] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          >
            <option value="New">New</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="invoice_no"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Invoice No
          </label>
          <input
            type="text"
            id="invoice_no"
            name="invoice_no"
            value={formData.invoice_no}
            onChange={handleChange}
            placeholder="Enter invoice number"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
        <div>
          <label
            htmlFor="invoice_date"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Invoice Date
          </label>
          <input
            type="date"
            id="invoice_date"
            name="invoice_date"
            value={formData.invoice_date}
            onChange={handleChange}
            placeholder="Enter invoice date"
            className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 flex w-min justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </form>

      <div className="mt-6">
        <div className="flex items-end justify-between w-[100vw] ">
          <div>
            <div className="text-sm/6 font-semibold">Search Record</div>
            <hr className="my-2" />
            <form className="flex space-x-4" onSubmit={handleSearch}>
              <input
                type="text"
                id="search"
                name="search"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter id value"
                className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />

              <button
                type="submit"
                className="mt-2 flex w-min justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <table className="mt-2 table-auto w-full text-sm text-left text-gray-700 border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Design</th>
              <th className="px-4 py-2">Overall Status</th>
              <th className="px-4 py-2">Invoice Number</th>
              <th className="px-4 py-2">Invoice Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchData && searchData.length > 0 ? (
              searchData.map((e) => (
                <tr
                  key={e._id}
                  className="border-b bg-gray-50 hover:bg-gray-100 transition duration-200"
                >
                  <td className="px-4 py-2 border-r">{e._id}</td>
                  <td className="px-4 py-2 border-r">{e.design}</td>
                  <td className="px-4 py-2 border-r">{e.overall_status}</td>
                  <td className="px-4 py-2 border-r">{e.invoice_no}</td>
                  <td className="px-4 py-2 border-r">{e.invoice_date}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <a
                      href={`/testUpdate/${e._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <button className="px-2 py-1 bg-purple-500 text-white rounded-md text-xs hover:bg-purple-600">
                        Update
                      </button>
                    </a>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data found for the given ID.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between ">
          <div className="text-sm/6 font-semibold">All Records</div>
          <button
            onClick={() => {
              setReload(1);
            }}
            className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Reload
          </button>
        </div>
        <hr className="my-2" />

        <table className="table-auto w-full text-sm text-left text-gray-700 border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr className="border-b">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Design</th>
              <th className="px-4 py-2">Overall Status</th>
              <th className="px-4 py-2">Invoice Number</th>
              <th className="px-4 py-2">Invoice Date</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((e, index) => {
              return (
                <tr
                  key={e._id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-4 py-2 border-r">{e._id}</td>
                  <td className="px-4 py-2 border-r">{e.design}</td>
                  <td className="px-4 py-2 border-r">{e.overall_status}</td>
                  <td className="px-4 py-2 border-r">{e.invoice_no}</td>
                  <td className="px-4 py-2 border-r">{e.invoice_date}</td>
                  <td className="px-4 py-2 flex justify-center space-x-2">
                    <a
                      href={`/testUpdate/${e._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <button className="px-2 py-1 bg-purple-500 text-white rounded-md text-xs hover:bg-purple-600">
                        Update
                      </button>
                    </a>
                    <button
                      onClick={() => handleDelete(e._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestSalesReport;
