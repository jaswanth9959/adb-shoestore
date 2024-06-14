import React from "react";
import { useGetUsersQuery } from "../../slices/customerApiSlice";
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

function CustomersScreen() {
  const navigate = useNavigate();
  const { data: customers, isLoading } = useGetUsersQuery();
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
        <Typography variant="h3">All Customers</Typography>

        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone</TableCell>
                <TableCell align="center">Address</TableCell>
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
                      <TableCell align="center">{customer.phone}</TableCell>
                      <TableCell align="left">
                        {customer.address},{customer.city}, {customer.zip},{" "}
                        {customer.country}
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

export default CustomersScreen;
