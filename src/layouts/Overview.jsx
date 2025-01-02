import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from "@mui/material";
import { readCookie } from "../utils/cookieUtils";
import { useNavigate } from "react-router-dom";
import axios from "@axios";

function Overview() {
  const [pendingCount, setPendingCount] = useState(null);
  const [pendingSales, setPendingSales] = useState([]); // Store pending sales records
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch pending sales and count on mount
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

  const username = readCookie("authorization");

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      {username ? (
        <Typography variant="h7" paragraph>
          Current Authorization: {username}
        </Typography>
      ) : (
        <Typography variant="body1" paragraph>
          No cookie found for "authorization".
        </Typography>
      )}

      {/* Pending Sales Table */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Pending Sales Records ({pendingCount} Pending)
        </Typography>
        {pendingSales.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">GST Number</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingSales.map((sale) => (
                  <TableRow
                    key={sale["SALES ID"]}
                    hover
                    onClick={() =>
                      navigate(
                        `/approval/${sale["SALES ID"]}?doc=sales&sales_id=${sale._id}`
                      )
                    }
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center">{sale["GST NUMBER"]}</TableCell>
                    <TableCell align="center">{sale["STATUS"]}</TableCell>
                    <TableCell align="center">{sale["DESCRIPTION"]}</TableCell>
                    <TableCell align="center">
                      {new Date(sale["CREATED AT"]["$date"]).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" color="primary">
                        View Details
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography variant="body2" color="gray">
            No pending sales records found.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Overview;
