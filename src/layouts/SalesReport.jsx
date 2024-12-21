import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function SalesReport() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authorization, setAuthorization] = useState("");
  const [users, setUsers] = useState([]);

  function HandleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3000/create_user", {
        username,
        password,
        authorization,
      })
      .then((result) => {
        console.log("User created successfully:", result.data);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/order_sheets")
      .then((response) => {
        console.log("Fetched users:", response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <>
      <div className="p-8">
        <form onSubmit={HandleSubmit}>
          <label>Username</label>
          <input
            className="border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <label>Password</label>
          <input
            className="border"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <label>Authorization</label>
          <input
            className="border"
            value={authorization}
            onChange={(e) => setAuthorization(e.target.value)}
          />
          <br />
          <br />
          <input
            className="border px-8 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>

      <div>
        <table className="border-collapse border border-gray-400 w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Design</th>
              <th className="border border-gray-400 px-4 py-2">
                Overall Status
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Invoice Number
              </th>
              <th className="border border-gray-400 px-4 py-2">Invoice Date</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id || index}>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.design || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.overall_status || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.invoice_no || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    {user.invoice_date || "N/A"}
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <Link to={`/update/${user._id}`}>
                      <button>Update</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SalesReport;
