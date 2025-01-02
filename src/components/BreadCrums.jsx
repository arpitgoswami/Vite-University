import { useNavigate } from "react-router-dom";

function BreadCrums() {
  const navigate = useNavigate();

  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  };

  return (
    <div class="navbar h-4 border-b bg-[#F2F2F2]">
      <div className="flex-1 breadcrumbs text-sm">
        <ul>
          <li
            className="btn btn-square btn-ghost"
            onClick={() => {
              navigate("../dashboard/overview");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </li>
          <li>
            <p>Dashboard</p>
          </li>

          <li>
            <span className="inline-flex items-center capitalize">
              {formatPathname(location.pathname)}
            </span>
          </li>
        </ul>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a onClick={() => navigate("../contact")}>Raise Query</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BreadCrums;
