function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="spinner-square">
        <div className="bg-indigo-500 square-1 square"></div>
        <div className="bg-indigo-500 square-2 square"></div>
        <div className="bg-indigo-500 square-3 square"></div>
      </div>
    </div>
  );
}

export default Loading;
