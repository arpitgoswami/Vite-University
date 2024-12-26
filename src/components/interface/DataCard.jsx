import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterData, fetchData, handleDelete } from "@function";
import Loading from "../Loading";

// Material UI Components
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";

import {
  Refresh as ReloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function DataCard({ url }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchDataAsync = async () => {
      try {
        await fetchData(url, setData, setLoading); // Use 'url' prop here
        setReload(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isMounted) {
      fetchDataAsync();
    }

    return () => {
      isMounted = false;
    };
  }, [reload, url]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (data.length === 0) {
    return <div>No data available</div>;
  }

  const columns = Object.keys(data[0]);
  const limitedColumns = columns.slice(0, 5);
  const filteredData = filterData(data, searchQuery, limitedColumns);

  return (
    <div className="container mx-auto p-4 sm:p-6 overflow-hidden">
      <div className="flex items-end justify-between mb-4">
        <Typography
          variant="body2"
          color="textPrimary"
          sx={{ fontSize: "0.875rem" }}
        >
          Sales Data
        </Typography>
        <div className="flex gap-2">
          <Button
            startIcon={<ReloadIcon />}
            variant="contained"
            color="primary"
            sx={{ padding: "4px 8px", fontSize: "0.75rem" }}
            onClick={() => fetchData(url, setData, setLoading)}
          >
            Reload
          </Button>

          <Button
            startIcon={<EditIcon />}
            variant="contained"
            color="success"
            sx={{ padding: "4px 8px", fontSize: "0.75rem" }}
            onClick={() => navigate(`/testCreate/${url}`)}
          >
            Add New Entry
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <TextField
          variant="outlined"
          label="Search..."
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            marginBottom: "8px",
            "& .MuiInputBase-root": { fontSize: "0.75rem" },
          }}
        />
      </div>

      <Grid container spacing={2}>
        {filteredData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                {limitedColumns
                  .filter((column) => column !== "_id")
                  .map((column) => (
                    <Typography
                      key={column}
                      variant="body2"
                      color="textSecondary"
                      sx={{ fontSize: "0.75rem" }}
                    >
                      <strong>
                        {column.charAt(0).toUpperCase() + column.slice(1)}:{" "}
                      </strong>
                      {item[column]}
                    </Typography>
                  ))}
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => navigate(`/testUpdate/${item._id}?doc=${url}`)}
                  disabled={data.length === 1}
                  sx={{ fontSize: "0.75rem" }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    if (data.length > 1) {
                      handleDelete(item._id, url, setReload);
                    }
                  }}
                  disabled={data.length === 1}
                  sx={{ fontSize: "0.75rem" }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DataCard;
