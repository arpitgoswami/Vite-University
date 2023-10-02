function Sidebar() {
  function exit() {
    let a = document.getElementById("message");
    message.style.display = "none";
  }
  return (
    <>
      <nav
        className="bg-gray-800 text-gray-100"
        style={{ width: "18.5rem", position: "fixed", height: "100%" }}
      >
        <div className="p-4  text-2xl font-semibold">😎 Education</div>
        <div className="p-4 border-y-2">Project Overview</div>
        <div className="p-4 text-sm">Product Categories</div>
        <ul className="mx-4 p-4 space-y-4 bg-gray-900 rounded-lg cursor-pointer">
          <li className="hover:text-gray-400">Dashboard</li>
          <li className="hover:text-gray-400">Students</li>
          <li className="hover:text-gray-400">Teachers</li>
          <li className="hover:text-gray-400">Courses</li>
        </ul>
        <div className="p-4 text-sm">All Categories</div>
        <div className="mx-4  bg-gray-900 rounded-lg" id="message">
          <div className="p-4">
            <div className="font-semibold">Customize your nav !</div>
            <div className="my-4 text-xs">
              You can now focus your console experience by customizing your
              navigation.
            </div>
            <div className="flex space-x-8 text-blue-700 font-semibold">
              <a href="">Learn More</a>
              <button onClick={exit}>Got it</button>
            </div>
          </div>
        </div>
        <div className="p-4 my-4 border-y-2">Upgrade</div>
      </nav>
    </>
  );
}

export default Sidebar;
