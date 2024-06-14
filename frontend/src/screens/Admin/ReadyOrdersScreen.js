import React from "react";
import { useGetReadyOrdersQuery } from "../../slices/ordersApiSlice";
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

function ReadyOrdersScreen() {
  const navigate = useNavigate();
  const { data: orders, isLoading } = useGetReadyOrdersQuery();
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
        <Typography variant="h3">All Ready Orders</Typography>

        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">OrderID</TableCell>
                <TableCell align="center">Customer Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Order Total</TableCell>
                <TableCell align="center">Payment Status</TableCell>
                <TableCell align="center">Delivery Status</TableCell>
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
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell align="center" component="th" scope="row">
                        {order._id}
                      </TableCell>
                      <TableCell align="center">
                        {order.customer.firstname}
                      </TableCell>
                      <TableCell align="center">
                        {order.customer.email}
                      </TableCell>
                      <TableCell align="center">
                        <strong>${order.totalPrice}</strong>
                      </TableCell>
                      <TableCell align="center" sx={{ color: "darkgreen" }}>
                        <strong>{order.isPaid ? "Paid" : " Pending"}</strong>
                      </TableCell>
                      <TableCell align="center">{order.orderStatus}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <Button onClick={() => navigate(`/order/${order._id}`)}>
                          View
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

export default ReadyOrdersScreen;
