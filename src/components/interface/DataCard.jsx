import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchData, handleDelete } from "@function";
import Loading from "../Loading";
import {
  Button,
  Typography,
  Tooltip,
  IconButton,
  TextField,
  Alert,
  Box,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import {
  Refresh as ReloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function DataCard({ url, header }) {
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
          backgroundColor: "#f5f5f5",
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
            {header}
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            {filteredData.map((item) => {
              // Remove sensitive fields like 'password' from the data before rendering
              const { PASSWORD, ...restItem } = item;

              return (
                <Card key={item._id} sx={{ maxWidth: 345 }}>
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    {/* Add other fields you want to display here */}
                    <Typography variant="body2" color="textSecondary">
                      {Object.keys(restItem).map((key) =>
                        key !== "_id" && key !== "name" ? (
                          <div key={key}>
                            {" "}
                            {/* Use div instead of p */}
                            <strong>
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </strong>{" "}
                            {restItem[key]}
                          </div>
                        ) : null
                      )}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/testUpdate/${item._id}?doc=${url}`)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(item._id, url)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default DataCard;
