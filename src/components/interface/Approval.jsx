import axios from "@axios";
import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Approval = () => {
  const [formData, setFormData] = useState(null);
  const [statusInput, setStatusInput] = useState("");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const { id } = useParams();
  const doc = params.get("doc");
  const sales_id = params.get("sales_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${doc}/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, doc]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/status/updateById", {
        id: sales_id,
        status: statusInput + " by " + "Admin",
      });
      console.log("Status updated:", response.data);
      toast.success("Status updated successfully!", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", padding: 4 }}>
      <Paper
        sx={{ padding: 4, width: "100%", maxWidth: 1500, borderRadius: 2 }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", mb: 2 }}
          align="center"
        >
          Approval
        </Typography>

        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="approval data table">
            <TableHead>
              <TableRow>
                {Object.keys(formData).map(
                  (key) =>
                    key !== "_id" && (
                      <TableCell key={key} sx={{ fontWeight: "bold" }}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                    )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {Object.keys(formData).map(
                  (key) =>
                    key !== "_id" && (
                      <TableCell key={key}>{formData[key] || "-"}</TableCell>
                    )
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box component="form" onSubmit={handleFormSubmit} sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Sales ID"
                variant="outlined"
                fullWidth
                value={sales_id}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ marginBottom: "20px" }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  label="Status"
                  required
                >
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Disapproved">Disapproved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="outlined" color="primary" onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" type="submit">
              Update Status via Form
            </Button>
          </Box>
        </Box>
      </Paper>
      <ToastContainer />
    </Box>
  );
};

export default Approval;
