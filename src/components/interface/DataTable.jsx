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
} from "@mui/material";
import {
  Refresh as ReloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function DataTable({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const serial = 1;

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
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const isSingleEntry = filteredData.length === 1;

  const columns = [
    ...Object.keys(data[0])
      .filter((column) => column !== "_id") // Exclude '_id' from the columns
      .slice(0, 5)
      .map((column) => ({
        field: column,
        headerName: column.charAt(0).toUpperCase() + column.slice(1),
        flex: 1,
        headerClassName: "bold-header",
      })),
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      headerClassName: "bold-header",
      renderCell: (params) => (
        <div className="flex gap-2">
          <Tooltip title="Edit" arrow>
            <span>
              <IconButton
                color="primary"
                disabled={isSingleEntry}
                onClick={() =>
                  navigate(`/testUpdate/${params.row._id}?doc=${url}`)
                }
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <span>
              <IconButton
                color="secondary"
                disabled={isSingleEntry}
                onClick={() =>
                  handleDelete(params.row._id, url, fetchDataAsync)
                }
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];

  const rows = filteredData.map((item) => ({
    id: item._id,
    ...item,
  }));

  const styles = {
    "& .bold-header": {
      fontWeight: "bold",
    },
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <Typography
          variant="h6"
          color="textPrimary"
          sx={{ fontSize: "1rem", fontWeight: 600 }}
        >
          Sales Data
        </Typography>
        <div className="flex gap-2">
          <Button
            startIcon={<ReloadIcon />}
            variant="contained"
            color="primary"
            sx={{ padding: "6px 12px", fontSize: "0.875rem" }}
            onClick={fetchDataAsync}
          >
            Reload
          </Button>
          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="success"
            sx={{ padding: "6px 12px", fontSize: "0.875rem" }}
            onClick={() => navigate(`/testCreate/${url}`)}
          >
            Add New Entry
          </Button>
        </div>
      </div>

      <TextField
        variant="outlined"
        label="Search"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          marginBottom: "12px",
          "& .MuiInputBase-root": { fontSize: "0.875rem" },
        }}
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
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 25]}
            disableSelectionOnClick
            sx={styles}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
