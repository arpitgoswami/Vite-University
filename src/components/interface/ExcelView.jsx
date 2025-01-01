import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelView = () => {
  // Sample data structure for demo
  const initialData = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Sam Brown", age: 25, email: "sam@example.com" },
  ];

  const [data, setData] = useState(initialData);
  const [editingRow, setEditingRow] = useState(null);
  const [newRow, setNewRow] = useState({ name: "", age: "", email: "" });

  const handleEdit = (row) => {
    setEditingRow(row.id);
    setNewRow(row);
  };

  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    setData(data.map((row) => (row.id === editingRow ? newRow : row)));
    setEditingRow(null);
    setNewRow({ name: "", age: "", email: "" });
  };

  const handleCancel = () => {
    setEditingRow(null);
    setNewRow({ name: "", age: "", email: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    setData([
      ...data,
      {
        id: Date.now(),
        name: newRow.name,
        age: newRow.age,
        email: newRow.email,
      },
    ]);
    setNewRow({ name: "", age: "", email: "" });
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Excel View</h1>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="border px-4 py-2">{row.id}</td>
                <td className="border px-4 py-2">
                  {editingRow === row.id ? (
                    <input
                      type="text"
                      name="name"
                      value={newRow.name}
                      onChange={handleInputChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    row.name
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingRow === row.id ? (
                    <input
                      type="number"
                      name="age"
                      value={newRow.age}
                      onChange={handleInputChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    row.age
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingRow === row.id ? (
                    <input
                      type="email"
                      name="email"
                      value={newRow.email}
                      onChange={handleInputChange}
                      className="border px-2 py-1"
                    />
                  ) : (
                    row.email
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingRow === row.id ? (
                    <div>
                      <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleEdit(row)}
                        className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2"></td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  name="name"
                  value={newRow.name}
                  onChange={handleInputChange}
                  className="border px-2 py-1"
                  placeholder="Name"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  name="age"
                  value={newRow.age}
                  onChange={handleInputChange}
                  className="border px-2 py-1"
                  placeholder="Age"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="email"
                  name="email"
                  value={newRow.email}
                  onChange={handleInputChange}
                  className="border px-2 py-1"
                  placeholder="Email"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={handleAddRow}
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                >
                  Add Row
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelView;
