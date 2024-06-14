import React from "react";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, Stack, Typography, Box } from "@mui/material";
function MyOrdersScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading } = useGetMyOrdersQuery(userInfo.user._id);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "90%",
        minHeight: "72vh",
        margin: "0 auto",
        padding: 2,
        position: "relative",
      }}
    >
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Your Orders
          </Typography>
          {orders.length === 0 && (
            <Typography variant="h6" color="orangered">
              No Orders as of Now.
            </Typography>
          )}
          {orders.map((order) => (
            <ListItem
              key={order._id}
              alignItems="flex-start"
              sx={{
                borderBottom: "1px solid #ccc",
                paddingBottom: 2,
                marginBottom: 2,
                alignItems: "center",
              }}
            >
              <Stack
                direction="row"
                spacing={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mx: "auto",
                  justifyContent: "space-between",
                  height: "36px",
                }}
              >
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="textSecondary"
                >
                  Order ID: <strong>{order._id}</strong>
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="textSecondary"
                >
                  Order Date:{" "}
                  <strong>
                    {new Date(order.createdAt).toLocaleDateString("us")}
                  </strong>
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="textSecondary"
                >
                  Order Total:<strong>${order.totalPrice}</strong>
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="textSecondary"
                >
                  Payment Status:{" "}
                  {order.isPaid ? (
                    <strong style={{ color: "green" }}>Paid</strong>
                  ) : (
                    <strong style={{ color: "red" }}>Paid</strong>
                  )}
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="textSecondary"
                >
                  Delivery Status:<strong>{order.orderStatus}</strong>
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => navigate(`/order/${order._id}`)}
                >
                  View
                </Button>
              </Stack>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
}

export default MyOrdersScreen;
