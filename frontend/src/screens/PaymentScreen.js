import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { clearcart } from "../slices/cartSlice";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Grid,
  Stack,
  Divider,
  Button,
  Paper,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
function PaymentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const [card, setCard] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp, setExp] = useState("");
  const [isWarranty, setIsWarranty] = useState(false);

  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        customerId: userInfo.user._id,
        orderItems: cartItems,
        cardNumber: card,
        email: userInfo.user.email,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: `${
          isWarranty ? addDecimals(Number(totalPrice) + 10) : totalPrice
        }`,
        isWarranty,
      }).unwrap();
      console.log(res);
      dispatch(clearcart());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
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
      <Typography variant="h4" gutterBottom>
        Order Items:
      </Typography>
      {cartItems.length ? (
        <>
          <List>
            {cartItems.map((product) => (
              <ListItem
                key={product.id}
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

          <Typography variant={"h4"}>Shipping Address:</Typography>
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
              Address: {shippingAddress.address}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              City: {shippingAddress.city}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Zip: {shippingAddress.zip}
            </Typography>
            <Typography component={"h6"} variant={"h6"} color="textSecondary">
              Country: {shippingAddress.country}
            </Typography>
          </Stack>
          <Divider sx={{ color: "#ccc" }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant={"h4"} sx={{ my: 3 }}>
                Order Total:
              </Typography>
              <Paper>
                <Stack
                  spacing={3}
                  direction="column"
                  sx={{
                    p: 2,
                  }}
                >
                  <Typography
                    component={"h6"}
                    variant={"h6"}
                    color="textSecondary"
                  >
                    Items Total: ${itemsPrice}
                  </Typography>

                  <FormControlLabel
                    control={
                      <Checkbox
                        value={isWarranty}
                        onChange={(e) => setIsWarranty(!isWarranty)}
                      />
                    }
                    label="Purchase 1 year Warranty ($10)"
                  />
                  <Divider />
                  <Typography
                    component={"h6"}
                    variant={"h6"}
                    color="textSecondary"
                  >
                    Shipping Price: ${shippingPrice}
                  </Typography>
                  <Divider />
                  <Typography
                    component={"h6"}
                    variant={"h6"}
                    color="textSecondary"
                  >
                    Tax: ${taxPrice}
                  </Typography>
                  <Divider />
                  <Typography
                    component={"h6"}
                    variant={"h6"}
                    color="textSecondary"
                  >
                    Total: $
                    {isWarranty
                      ? addDecimals(Number(totalPrice) + 10)
                      : totalPrice}
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant={"h4"} sx={{ my: 3 }}>
                Payment Method: Card
              </Typography>
              <Paper
                sx={{ mt: 1, p: 4, position: "relative", height: "310px" }}
              >
                <Typography variant="h5">Card Details:</Typography>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="card"
                  label="Card"
                  placeholder="Eg. 6011 2345 6789 0123"
                  name="card"
                  autoComplete="card"
                  value={card}
                  onChange={(e) => setCard(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  placeholder="***"
                  id="cvv"
                  label="CVV"
                  name="CVV"
                  autoComplete="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="exp"
                  label="Exp"
                  name="exp"
                  autoComplete="exp"
                  value={exp}
                  onChange={(e) => setExp(e.target.value)}
                  placeholder="mm/yyyy"
                />
                <Button
                  variant="contained"
                  onClick={placeOrderHandler}
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    right: 30,
                    bgcolor: "primary.light",
                  }}
                >
                  Pay
                </Button>
                {isLoading && (
                  <Typography variant="body2">Loading...</Typography>
                )}
                {error && (
                  <Typography variant="body2">{error?.message}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant="h6">
          Your Cart is Empty. <Link to="/">View Shoes</Link>
        </Typography>
      )}
    </Box>
  );
}

export default PaymentScreen;
