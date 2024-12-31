import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "@axios";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]); // Store pending sales records

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const formatPathname = (pathname) => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.join(" > ");
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="body2"
            sx={{
              color: "gray",
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
            }}
          >
            <HomeIcon sx={{ marginRight: 1 }} />
            {"> " + formatPathname(location.pathname)}
          </Typography>
          <IconButton color="inherit" onClick={toggleSidebar}>
            <Badge
              badgeContent={pendingCount}
              color="primary"
              sx={{ position: "relative" }}
            >
              <NotificationsIcon sx={{ color: "gray" }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {isSidebarOpen && (
        <Box
          className="fixed top-0 right-0 w-64 h-full bg-white text-gray-800 shadow-xl p-4 border-l border-gray-300"
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            width: 256,
            height: "100vh",
            backgroundColor: "white",
            borderLeft: "1px solid #ccc",
            boxShadow: "3px 0 10px rgba(0,0,0,0.1)",
            padding: 2,
            overflowY: "auto",
            zIndex: 1200,
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Notifications
          </Typography>
          {pendingSales.length > 0 ? (
            pendingSales.map((sale, index) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Card
                  sx={{ maxWidth: 300, cursor: "pointer" }}
                  onClick={() =>
                    navigate(
                      `/approval/${sale["SALES ID"]}?doc=sales&sales_id=${sale._id}`
                    )
                  }
                >
                  <CardContent>
                    <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
                      SALES ID: {sale["SALES ID"]}
                    </Typography>
                  </CardContent>
                </Card>
                {index < pendingSales.length - 1 && (
                  <Divider sx={{ marginY: 1 }} />
                )}
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="gray">
              No pending approvals.
            </Typography>
          )}
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
      )}
    </>
  );
}

export default Navbar;
