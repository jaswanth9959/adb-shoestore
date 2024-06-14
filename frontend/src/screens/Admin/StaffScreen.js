import React from "react";
import { useGetStaffQuery } from "../../slices/staffApiSlice";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function StaffScreen() {
  const navigate = useNavigate();
  const { data: customers, isLoading } = useGetStaffQuery();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/admin/dashboard")}
        sx={{ my: 3 }}
      >
        Dashboard
      </Button>
      <Box sx={{ minHeight: 601 }}>
        <Typography variant="h3">All Staff</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/staff/add")}
          >
            Add Staff
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Ssn</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <Typography variant="body1" component="span">
                  Loading.....
                </Typography>
              ) : (
                <>
                  {" "}
                  {customers.map((customer) => (
                    <TableRow key={customer._id}>
                      <TableCell align="center" component="th" scope="row">
                        {customer.firstname}
                      </TableCell>
                      <TableCell align="center">{customer.lastname}</TableCell>
                      <TableCell align="center">{customer.email}</TableCell>
                      <TableCell align="center">{customer.ssn}</TableCell>
                      <TableCell align="center">{customer.role}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button
                          onClick={() =>
                            navigate(`/admin/staff/edit/${customer._id}`)
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default StaffScreen;
