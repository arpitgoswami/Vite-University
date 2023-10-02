import React from "react";

function Dashboard() {
  const students = [
    { id: 1, name: "John Doe", grade: "A", age: 20 },
    { id: 2, name: "Alice Johnson", grade: "B", age: 22 },
    { id: 3, name: "Bob Smith", grade: "A-", age: 21 },
    { id: 4, name: "Eva Williams", grade: "B+", age: 23 },
  ];
  const monthlyExpenses = [
    { id: 1, category: "Office Supplies", amount: 500 },
    { id: 2, category: "Utilities", amount: 800 },
    { id: 3, category: "Salaries", amount: 3000 },
    { id: 4, category: "Rent", amount: 1200 },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Total Students</h2>
          <p className="text-4xl font-bold text-blue-500">245</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Staff Members</h2>
          <p className="text-4xl font-bold text-green-500">32</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Monthly Fees Collection ($)
          </h2>
          <p className="text-4xl font-bold text-yellow-500">$18,500</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses ($)</h2>
          <p className="text-4xl font-bold text-red-500">$12,700</p>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Grade
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Age
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {student.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {student.grade}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {student.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                Amount ($)
              </th>
            </tr>
          </thead>
          <tbody>
            {monthlyExpenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {expense.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {expense.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
