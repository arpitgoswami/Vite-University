import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  BarChart as BarChartIcon,
  ShoppingCart as ShoppingCartIcon,
  Assessment as AssessmentIcon,
} from "@mui/icons-material";

function Overview() {
  const tiles = [
    { title: "Dashboard", icon: <DashboardIcon fontSize="large" /> },
    { title: "Analytics", icon: <BarChartIcon fontSize="large" /> },
    { title: "Orders", icon: <ShoppingCartIcon fontSize="large" /> },
    { title: "Reports", icon: <AssessmentIcon fontSize="large" /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {tiles.map((tile, index) => (
          <Grid item key={index}>
            <Paper
              elevation={3}
              sx={{
                width: 150,
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => alert(`${tile.title} clicked`)}
            >
              <Box sx={{ color: "primary.main", mb: 1 }}>{tile.icon}</Box>
              <Typography variant="h6">{tile.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Overview;
