import React, { useState } from "react";
import axios from "axios";

const Edit = () => {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:3000/data", {
        invoice_no: invoiceNo,
      });
      setResult(response.data); // Set the result
      setError(""); // Clear any previous errors
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while searching."
      );
      setResult(null); // Clear previous results
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Search Invoice</h2>
      <input
        type="text"
        onChange={(e) => setInvoiceNo(e.target.value)}
        placeholder="Enter Invoice Number"
        required
        style={{
          width: "80%",
          padding: "10px",
          marginRight: "10px",
          fontSize: "16px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Search
      </button>
      <div style={{ marginTop: "20px" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {result && (
          <div>
            <h3>Result:</h3>
            <form style={{ display: "grid", gap: "10px" }}>
              {Object.entries(result).map(([key, value]) => (
                <div
                  key={key}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {key}:
                  </label>
                  <input
                    type="text"
                    value={
                      typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : value
                    }
                    readOnly
                    style={{
                      padding: "10px",
                      fontSize: "14px",
                      backgroundColor: "#f4f4f4",
                      border: "1px solid #ddd",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              ))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Edit;
