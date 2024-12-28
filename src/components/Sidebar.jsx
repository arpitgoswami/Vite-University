import React from "react";
import { ToastContainer } from "react-toastify";

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
  Description,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

function Sidebar({ onNavChange }) {
  const [openPurchaseOrder, setOpenPurchaseOrder] = React.useState(false);

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
            onClick={() => (window.location.href = "../dashboard")}
          >
            <Typography variant="h6" fontWeight="bold">
              <img src="/logo.jpg" />
            </Typography>
          </Box>

          {/* Divider */}
          <Divider />

          {/* Navigation */}
          <List>
            {/* Overview */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => onNavChange("Overview")}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Overview" />
              </ListItemButton>
            </ListItem>

            {/* Sales Report */}
            <ListItem disablePadding>
              <ListItemButton onClick={() => onNavChange("SalesReport")}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Sales Report" />
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
                    onClick={() => onNavChange("OrderSheet")}
                  >
                    <ListItemIcon>
                      <Description />
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
                      <Description />
                    </ListItemIcon>
                    <ListItemText primary="RFD" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{ pl: 8 }}
                    onClick={() => onNavChange("Cancelled")}
                  >
                    <ListItemIcon sx={{}}>
                      <Description />
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
