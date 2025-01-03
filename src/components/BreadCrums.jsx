import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@axios";
import { readCookie } from "../utils/cookieUtils";

function BreadCrums() {
  const navigate = useNavigate();

  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  };

  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]); // Store pending sales records

  const username = readCookie("username");

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await axios.get("/status/pending");
        setPendingCount(response.data.pendingCount);
        setPendingSales(response.data.pendingRecords); // Store the sales records
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };
    fetchPendingCount();
  }, []);

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
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-square btn-ghost">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {pendingCount > 0 && (
              <span className="indicator-item indicator-end badge badge-xs badge-primary"></span>
            )}
          </div>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          {pendingSales.length > 0 ? (
            pendingSales.map((sale, index) => (
              <li key={index}>
                <a
                  onClick={() =>
                    navigate(
                      `/approval/${sale["SALES ID"]}?doc=sales&sales_id=${sale._id}`
                    )
                  }
                >
                  <p>Approval {index + 1}</p>
                </a>
              </li>
            ))
          ) : (
            <li>
              <a>
                <p>No pending approvals.</p>
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BreadCrums;
