const Academics = () => {
  const feeStatements = [
    { month: "January", amount: 500 },
    { month: "February", amount: 550 },
    { month: "March", amount: 520 },
    // Add more fee statements as needed
  ];

  const totalFeesPaid = feeStatements.reduce(
    (total, statement) => total + statement.amount,
    0
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Academic Page</h1>
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Fee Statements</h2>
          <ul className="text-left">
            {feeStatements.map((statement, index) => (
              <li key={index}>
                {statement.month}: ${statement.amount}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Total Fees Paid</h2>
          <p>${totalFeesPaid}</p>
        </div>
      </div>
    </div>
  );
};

export default Academics;
