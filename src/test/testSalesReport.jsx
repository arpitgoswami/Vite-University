import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function TestSalesReport() {
  const [salesData, setSalesData] = useState([]);

  const [formData, setFormData] = useState({
    design: "",
    overall_status: "",
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
  }, []);

  const HandleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/order_sheets/${id}`)
      .then((result) => {
        console.log("Deleted successfully:", result);
      })
      .catch((err) => {
        console.error("Error deleting:", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/order_sheets/", formData)
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Design</th>
              <th>Overall Status</th>
              <th>Invoice Number</th>
              <th>Invoice Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((e) => {
              return (
                <tr key={e._id}>
                  <td>{e._id}</td>
                  <td>{e.design}</td>
                  <td>{e.overall_status}</td>
                  <td>{e.invoice_no}</td>
                  <td>{e.invoice_date}</td>
                  <td>
                    <Link to={`/update/${e._id}`}>
                      <button>Update</button>
                    </Link>
                    <button
                      onClick={() => {
                        HandleDelete(e._id);
                      }}
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

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="design">Design:</label>
          <input
            type="text"
            id="design"
            name="design"
            value={formData.design}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="overall_status">Overall Status:</label>
          <input
            type="text"
            id="overall_status"
            name="overall_status"
            value={formData.overall_status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="invoice_no">Invoice No:</label>
          <input
            type="text"
            id="invoice_no"
            name="invoice_no"
            value={formData.invoice_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="invoice_date">Invoice Date:</label>
          <input
            type="text"
            id="invoice_date"
            name="invoice_date"
            value={formData.invoice_date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default TestSalesReport;
