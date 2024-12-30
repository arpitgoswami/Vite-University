import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home"; // Import the icon you want to use
import { useLocation } from "react-router-dom"; // Import useLocation for getting current URL

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle state
  const location = useLocation(); // Get the current location (URL)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  // Function to format the pathname, replacing '/' with '>'
  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean); // Split path and remove empty segments
    return segments.join(" > "); // Join segments with '>'
  };

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Show Current URL with Icon */}
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ marginRight: 1 }} /> {/* Add your icon here */}
            {"> " + formatPathname(location.pathname)}{" "}
            {/* Display formatted path */}
          </Typography>

          {/* Notification Icon */}
          <IconButton color="inherit" onClick={toggleSidebar}>
            <Badge
              badgeContent={7}
              color="primary"
              sx={{ position: "relative" }}
            >
              <NotificationsIcon sx={{ color: "gray" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar (Right Side) */}
      {isSidebarOpen && (
        <Box
          className="fixed top-0 right-0 w-64 h-full bg-white text-gray-800 shadow-xl p-4 border-l border-gray-300"
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 256, // Adjust the width of the sidebar
            height: "100vh",
            backgroundColor: "white",
            borderLeft: "1px solid #ccc",
            boxShadow: "3px 0 10px rgba(0,0,0,0.1)", // Optional shadow for the sidebar
            padding: 2,
            overflowY: "auto",
            zIndex: 1200, // Ensure it's on top of other elements
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Notifications
          </Typography>
          <Box>
            <ul>
              <li className="mb-2">New comment on your post</li>
              <li className="mb-2">New follower</li>
              <li className="mb-2">Server downtime warning</li>
              <li className="mb-2">New message received</li>
              {/* Add more notifications here */}
            </ul>
            <Box sx={{ marginTop: 2 }}>
              <IconButton
                className="mt-4 bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600"
                onClick={toggleSidebar}
                sx={{
                  backgroundColor: "indigo",
                  color: "white",
                  "&:hover": { backgroundColor: "indigo" },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Navbar;
