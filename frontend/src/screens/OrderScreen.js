import React from "react";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateOrderStatusMutation } from "../slices/ordersApiSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
function OrderScreen() {
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const { data: order, refetch, isLoading } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);
  const [updateOrder, { isLoading: loadingUpdate }] =
    useUpdateOrderStatusMutation();
  const date = new Date(order?.createdAt);

  date.setDate(date.getDate() + 365);

  const handleUpdate = async (id) => {
    await updateOrder({ id: id, userId: userInfo.user._id });

    toast.success("Order status is Updated!");
    refetch();
  };

  return (
    <Box
      sx={{
        width: "80%",
        minHeight: "72vh",
        margin: "0 auto",
        padding: 2,
      }}
    >
      {userInfo.user.role === "admin" && (
        <Button
          variant="contained"
          onClick={() => navigate("/admin/orders")}
          sx={{ my: 3 }}
        >
          All Orders
        </Button>
      )}
      {userInfo.user.role === "delivery" && (
        <Button
          variant="contained"
          onClick={() => navigate("/admin/dashboard")}
          sx={{ my: 3 }}
        >
          Back
        </Button>
      )}
      <Typography variant="h4" gutterBottom>
        Order Details: Order ID: {order?._id}
      </Typography>
      {userInfo.user.role !== "user" && order?.orderStatus !== "Delivered" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {loadingUpdate && <Typography variant="body2">Loading...</Typography>}
          <Button variant="contained" onClick={() => handleUpdate(order._id)}>
            {order?.orderStatus === "Yet to Process"
              ? "Ready for shipping"
              : order?.orderStatus === "Ready"
              ? "Mark as out for delivery"
              : "Mark as Delivered"}
          </Button>
        </Box>
      )}
      {!isLoading ? (
        <>
          {order?.isWarranty ? (
            <Typography variant="body1" color="#35b053">
              Order Is Covered in One Year Warranty. Warranty Expires On{" "}
              {new Date(date).toLocaleDateString("en-US")}.
            </Typography>
          ) : (
            <Typography variant="body1" color="#f4c648">
              Order Is Not Covered in Warranty.
              {new Date(date).toLocaleDateString("en-US")}.
            </Typography>
          )}
          <List>
            {order.orderItems.map((product) => (
              <ListItem
                key={product._id}
                alignItems="flex-start"
                sx={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: 2,
                  marginBottom: 2,
                  alignItems: "center",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    sx={{ width: 100, height: 100, marginRight: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography component={"span"} variant={"h6"}>
                      {product.name}
                    </Typography>
                  }
                  secondary={
                    <Stack
                      direction="row"
                      spacing={6}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mx: "auto",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Brand: {product.brand}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Size: {product.size}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Quantity: {product.qty}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Color: {product.color?.toUpperCase()}
                      </Typography>
                      <Typography
                        component={"span"}
                        variant={"body2"}
                        color="textSecondary"
                      >
                        Price: ${product.price}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItem>
            ))}
          </List>
          <Typography variant={"h4"} sx={{ my: 2 }}>
            Order Total:
          </Typography>

          <Stack
            spacing={8}
            direction="row"
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              mx: "auto",
              px: 3,
              justifyContent: "space-between",
            }}
          >
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Items Total: ${order.itemsPrice}
            </Typography>

            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Shipping Price: ${order.shippingPrice}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Tax: ${order.taxPrice}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Total: ${order.totalPrice}
            </Typography>
          </Stack>
          <Divider />
          <Typography variant={"h4"} sx={{ my: 2 }}>
            Shipping Address:
          </Typography>
          <Stack
            spacing={8}
            direction="row"
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              mx: "auto",
              px: 3,
              justifyContent: "space-between",
            }}
          >
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Address: {order.shippingAddress.address}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              City: {order.shippingAddress.city}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Zip: {order.shippingAddress.zip}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Country: {order.shippingAddress.country}
            </Typography>
          </Stack>

          <Divider />
          <Typography variant={"h4"} sx={{ my: 2 }}>
            Payment Details:
          </Typography>
          <Stack
            spacing={8}
            direction="row"
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              mx: "auto",
              px: 3,
              justifyContent: "space-evenly",
            }}
          >
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Payment Status:{" "}
              {order.isPaid && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "green" }}
                >
                  <strong>Paid</strong>
                </Typography>
              )}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Paid On: {new Date(order.paidAt).toLocaleDateString("en-US")}{" "}
              {new Date(order.paidAt).toLocaleTimeString("en-US")}
            </Typography>
          </Stack>
          <Divider />
          <Typography variant={"h4"} sx={{ my: 2 }}>
            Delivery Details:
          </Typography>
          <Stack
            spacing={8}
            direction="row"
            sx={{
              my: 3,
              display: "flex",
              alignItems: "center",
              mx: "auto",
              px: 3,
              justifyContent: "space-evenly",
            }}
          >
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Delivery Status:{" "}
              {order.orderStatus === "Yet to Process" && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "green" }}
                >
                  <strong>Order Recived. We will Process Soon</strong>
                </Typography>
              )}
              {order.orderStatus === "Ready" && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "green" }}
                >
                  <strong>Order is processed. We will deliver it soon.</strong>
                </Typography>
              )}
              {order.orderStatus === "Out for Delivery" && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "green" }}
                >
                  <strong>Order is Out for delivery.</strong>
                </Typography>
              )}
              {order.orderStatus === "Delivered" && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "green" }}
                >
                  <strong>Order is Delivered.</strong>
                </Typography>
              )}
            </Typography>

            {order?.deliveredAt && (
              <Typography component={"h6"} variant={"h6"} color="textSecondary">
                Paid On:{" "}
                {new Date(order.deliveredAt).toLocaleDateString("en-US")}{" "}
                {new Date(order.deliveredAt).toLocaleTimeString("en-US")}
              </Typography>
            )}

            {order?.deliveredAt && (
              <Typography component={"h6"} variant={"h6"} color="textSecondary">
                Delivered By : {order.deliveredBy.firstname}{" "}
                {order.deliveredBy.lastname}
              </Typography>
            )}
          </Stack>
        </>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </Box>
  );
}

export default OrderScreen;
