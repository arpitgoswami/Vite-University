import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { filterData, fetchData, handleDelete } from "@function";
import Loading from "../Loading";

// Material UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  TablePagination,
} from "@mui/material";

import {
  Refresh as ReloadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

function DataTable({ url }) {
  const [data, setData] = useState([]);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
  }, [reload, url]); // Include 'url' in the dependency array

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

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page on rows per page change
  };

  // Paginated data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 overflow-hidden">
      <div className="flex items-end justify-between mb-4">
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
            onClick={() => fetchData(url, setData, setLoading)}
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

      <div className="mb-4">
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
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#afafaf" }}>
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRight: "1px solid #ccc",
                }}
              >
                S. No.
              </TableCell>
              {limitedColumns
                .filter((column) => column !== "_id") // Exclude _id column
                .map((column) => (
                  <TableCell
                    key={column}
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableCell>
                ))}
              <TableCell
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  borderRight: "1px solid #ccc",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell
                  sx={{ fontSize: "0.875rem", borderRight: "1px solid #ccc" }}
                >
                  {page * rowsPerPage + index + 1}
                </TableCell>
                {limitedColumns
                  .filter((column) => column !== "_id") // Exclude _id column
                  .map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        fontSize: "0.875rem",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      {item[column]}
                    </TableCell>
                  ))}
                <TableCell
                  sx={{ fontSize: "0.875rem", borderRight: "1px solid #ccc" }}
                >
                  <div className="flex gap-2">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/testUpdate/${item._id}?doc=${url}`)
                        }
                        disabled={data.length === 1}
                        sx={{ padding: "4px", fontSize: "0.875rem" }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        color="secondary"
                        onClick={() => {
                          if (data.length > 1) {
                            handleDelete(item._id, url, setReload);
                          }
                        }}
                        disabled={data.length === 1}
                        sx={{ padding: "4px", fontSize: "0.875rem" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ paddingTop: "16px", paddingBottom: "16px" }}
      />
    </div>
  );
}

export default DataTable;
