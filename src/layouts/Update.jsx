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
    <div>
      <form onSubmit={Update}>
        <label>Design</label>
        <input
          value={design}
          onChange={(e) => setDesign(e.target.value)} // Update state on change
          className="border"
        />
        <br />
        <br />
        <label>Overall Status</label>
        <input
          value={overallStatus}
          onChange={(e) => setOverall_Status(e.target.value)}
          className="border"
        />
        <br />
        <br />
        <label>Invoice Number</label>
        <input
          value={invoiceNo}
          onChange={(e) => setInvoice_No(e.target.value)}
          className="border"
        />
        <br />
        <br />
        <label>Invoice Date</label>
        <input
          value={invoiceDate}
          onChange={(e) => setInvoice_Date(e.target.value)}
          className="border"
        />
        <br />
        <br />
        <button type="submit" className="border px-4 py-2">
          Update
        </button>
      </form>
    </div>
  );
}

export default Update;
