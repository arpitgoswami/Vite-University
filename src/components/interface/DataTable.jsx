import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, handleDelete } from "@function";
import Loading from "../Loading";
import { DataGrid } from "@mui/x-data-grid";

import {
  Button,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Alert,
  Box,
} from "@mui/material";

import {
  Visibility as ViewIcon,
  Refresh as ReloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function DataTable({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchDataAsync = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchData(url, setData, setLoading);
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchDataAsync();
  }, [url]);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "#f5f5f5", // Same background as earlier
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (data.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">No data available</Typography>
      </Box>
    );
  }

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const columns = [
    ...Object.keys(data[0])
      .filter((column) => column !== "_id")
      .slice(0, 5)
      .map((column) => ({
        field: column,
        headerName: column.charAt(0).toUpperCase() + column.slice(1),
        flex: 1,
      })),
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        const isDeleteDisabled =
          searchQuery.trim() === "" && filteredData.length === 1;

        return (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="View" arrow>
              <IconButton
                color="info"
                onClick={() =>
                  window.open(`/invoice/${params.row._id}/${url}`, "_blank")
                }
              >
                <ViewIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit" arrow>
              <IconButton
                color="primary"
                onClick={() =>
                  navigate(`/testUpdate/${params.row._id}?doc=${url}`)
                }
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete" arrow>
              <IconButton
                color="secondary"
                disabled={isDeleteDisabled}
                onClick={() => handleDelete(params.row._id, url)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  const rows = filteredData.map((item) => ({
    id: item._id,
    ...item,
  }));

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sales Data
          </Typography>
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button
              startIcon={<ReloadIcon />}
              variant="contained"
              color="primary"
              onClick={fetchDataAsync}
            >
              Reload
            </Button>
            <Button
              startIcon={<EditIcon />}
              variant="contained"
              color="success"
              onClick={() => navigate(`/testCreate/${url}`)}
            >
              Add New Entry
            </Button>
          </Box>
        </Box>

        <TextField
          variant="outlined"
          label="Search"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        {filteredData.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center" }}
          >
            No matching records found.
          </Typography>
        ) : (
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 25]}
              disableSelectionOnClick
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DataTable;
