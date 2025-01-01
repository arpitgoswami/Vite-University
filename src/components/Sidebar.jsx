import React from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { handleDeleteCookie } from "@cookie";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Divider,
  Button,
  Box,
  Typography,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
  Description as DescriptionIcon,
  ExpandLess,
  ExpandMore,
  Person as PersonIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
} from "@mui/icons-material";

function Sidebar({ onNavChange }) {
  const [openPurchaseOrder, setOpenPurchaseOrder] = React.useState(false);
  const navigate = useNavigate();

  const handlePurchaseOrderClick = () => {
    setOpenPurchaseOrder(!openPurchaseOrder);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 288,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 288,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        {/* Top Section */}
        <Box>
          {/* Logo */}
          <Box
            sx={{
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = "../dashboard/overview")}
          >
            <Typography variant="h6" fontWeight="bold">
              <img src="/logo.jpg" alt="Logo" />
            </Typography>
          </Box>

          {/* Divider */}
          <Divider />

          {/* Navigation */}
          <List>
            {/* Overview */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("../dashboard/overview")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
            </ListItem>

            {/* Sales Report */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("../dashboard/salesreport")}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Report" />
              </ListItemButton>
            </ListItem>

            {/* PPIC Register */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("../dashboard/ppic")}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary="PPIC Register" />
              </ListItemButton>
            </ListItem>

            {/* Users */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("../dashboard/users")}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </ListItem>

            <Divider />

            {/* Purchase Order */}
            <ListItem disablePadding>
              <ListItemButton onClick={handlePurchaseOrderClick}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Purchase Order" />
                {openPurchaseOrder ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>

            {/* Sub-tabs for Purchase Order */}
            <Collapse in={openPurchaseOrder} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => navigate("../dashboard/ordersheet")}
                  >
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Order Sheet" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => onNavChange("RFD")}
                  >
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="RFD" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => onNavChange("Cancelled")}
                  >
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cancelled" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>

            <Divider />

            {/* Performance */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => onNavChange("Performance")}>
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary="Performance" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        {/* Logout Button */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleDeleteCookie}
          >
            Log out
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Drawer>
  );
}

export default Sidebar;
